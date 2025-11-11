'use client';

import { useState } from 'react';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  availableDays: number[]; // 0 = Sunday, 1 = Monday, etc.
}

export default function Calendar({ selectedDate, onDateSelect, availableDays }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if date is in the past
    if (date < today) {
      return false;
    }

    // Check if the day of week is available
    const dayOfWeek = date.getDay();
    return availableDays.includes(dayOfWeek);
  };

  const isSameDay = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (isDateAvailable(date)) {
      onDateSelect(date);
    }
  };

  const renderCalendarDays = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square"></div>
      );
    }

    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const available = isDateAvailable(date);
      const selected = isSameDay(selectedDate, date);
      const isToday = isSameDay(new Date(), date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={!available}
          className={`
            aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all
            ${selected 
              ? 'bg-[#2F80ED] text-white shadow-md' 
              : available 
                ? 'hover:bg-blue-50 text-gray-900 border border-gray-200' 
                : 'text-gray-300 cursor-not-allowed'
            }
            ${isToday && !selected ? 'border-2 border-[#2F80ED]' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const today = new Date();
  const isPrevMonthDisabled = 
    currentMonth.getMonth() === today.getMonth() && 
    currentMonth.getFullYear() === today.getFullYear();

  return (
    <div className="bg-white rounded-xl p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          disabled={isPrevMonthDisabled}
          className={`p-2 rounded-lg transition-colors ${
            isPrevMonthDisabled 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>

        <button
          onClick={handleNextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-[#2F80ED] rounded"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#2F80ED] rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
}
