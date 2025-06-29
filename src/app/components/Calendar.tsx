'use client';
import { useEffect, useState } from 'react';

export default function Calendar() {
    const dDay = new Date('2025-08-15T11:00:00');
    const [countdown, setCountdown] = useState({
        days: 0,
    });

    // 카운트다운 계산
    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const diff = dDay.getTime() - now.getTime();
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));

            setCountdown({ days });
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="flex flex-col items-center bg-white text-center py-10 text-gray-700 mx-auto">
        
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4"> 함께하는 날  </h2>
            <h2 className="text-xl font-semibold mb-1">2025년 08월 15일 </h2>
            <p className="text-md mb-6">금요일 오전 11시</p>

            {/* 달력 */}
            <div className="calendar bg-white rounded-xl shadow p-4 mb-6 mx-auto">
                <table className="table-fixed text-sm w-full text-gray-700">
                    <thead>
                        <tr>
                            <th className="p-1">일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 날짜 데이터 - 간단 구현 (10월 기준) */}
                        <tr>
                            <td className="text-[#c64a3f]"> &nbsp; </td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>1</td><td>2</td>
                        </tr>
                        <tr>
                            <td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td>
                        </tr>
                        <tr>
                            <td className="text-[#c64a3f]">10</td><td>11</td><td>12</td><td>13</td><td>14</td>
                            <td> <div className="w-8 h-8 flex items-center justify-center bg-[#d3a48f] text-white rounded-full">15</div> </td><td>16</td>
                        </tr>
                        <tr>
                            <td className="text-[#c64a3f]">17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td>
                        </tr>
                        <tr>
                            <td className="text-[#c64a3f]">24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td>
                        </tr>
                        <tr>
                            <td className="text-[#c64a3f]">31</td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <p className="text-xl mt-10">
                <span className="font-semibold "> 성회 일정까지 </span>
                <span className="text-[#e87b6a] font-bold">{countdown.days}일</span> 남았습니다.
            </p>
        </section>
    );
}
