import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/* /admin 보호 미들웨어.
 *
 * - 반드시 src/middleware.ts 에 있어야 동작한다 (src 디렉터리 구조). 루트에 있던 동안은 실행되지 않아
 *   관리자 페이지가 누구에게나 열려 있었다 (2026-10-06 발견·수정).
 * - matcher를 /admin 으로 한정한다. 전체 경로에 걸면 Supabase 장애·미설정 시 사이트 전체가 멈춘다.
 * - Supabase 호출은 try/catch — 실패하면 로그인 페이지로 보낸다 (열어 두지 않는다). */
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const toLogin = () => {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?next=${encodeURIComponent(request.nextUrl.pathname)}`;
    return NextResponse.redirect(url);
  };

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder",
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return toLogin();

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  } catch {
    return toLogin();
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
