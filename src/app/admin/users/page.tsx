"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { toast } from "sonner";
import type { Profile } from "@/types";

export default function AdminUsersPage() {
  const supabase = useSupabase();
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    setUsers(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleRole = async (user: Profile) => {
    const newRole = user.role === "admin" ? "member" : "admin";
    if (!confirm(`${user.email}의 역할을 ${newRole}로 변경하시겠습니까?`)) return;

    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", user.id);

    if (error) {
      toast.error("역할 변경 실패");
      return;
    }

    toast.success(`${user.email}의 역할이 ${newRole}로 변경되었습니다.`);
    fetchUsers();
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">사용자 관리</h1>

      {loading ? (
        <p className="text-muted-foreground">로딩 중...</p>
      ) : users.length === 0 ? (
        <p className="text-muted-foreground">등록된 사용자가 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.email}</p>
                <p className="text-xs text-muted-foreground">
                  {user.full_name || "이름 없음"}
                </p>
              </div>
              <Badge variant={user.role === "admin" ? "primary" : "default"}>
                {user.role}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleRole(user)}
              >
                {user.role === "admin" ? "일반으로 변경" : "관리자로 변경"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
