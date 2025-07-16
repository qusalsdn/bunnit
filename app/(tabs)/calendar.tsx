import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const days = ["일", "월", "화", "수", "목", "금", "토"];

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const prevDates = Array.from({ length: firstDay }, (_, i) => new Date(year, month - 1, prevLastDate - firstDay + i + 1));

  const thisDates = Array.from({ length: lastDate }, (_, i) => new Date(year, month, i + 1));

  const totalNeeded = prevDates.length + thisDates.length;
  const totalCells = totalNeeded <= 35 ? 35 : 42;
  const nextNeeded = totalCells - totalNeeded;

  const nextDates = Array.from({ length: nextNeeded }, (_, i) => new Date(year, month + 1, i + 1));

  const fullDates = [...prevDates, ...thisDates, ...nextDates];

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.month}>
          {year}년 {month + 1}월
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* 요일 */}
      <View style={styles.dayRow}>
        {days.map((day, idx) => {
          const style = day === "일" ? styles.sunday : day === "토" ? styles.saturday : styles.weekday;

          return (
            <Text key={idx} style={style}>
              {day}
            </Text>
          );
        })}
      </View>

      {/* 날짜 셀 */}
      <View style={styles.dateGrid}>
        {fullDates.map((date, idx) => {
          const isCurrentMonth = date.getMonth() === month;
          const isToday = isSameDay(date, today);
          const isSelected = selectedDate && isSameDay(date, selectedDate);

          let showCircle = false;
          if (selectedDate) {
            showCircle = isSelected ?? false;
          } else {
            showCircle = isToday && isCurrentMonth;
          }

          return (
            <TouchableOpacity
              key={idx}
              style={styles.dateCell}
              disabled={!isCurrentMonth}
              onPress={() => isCurrentMonth && handleSelectDate(date)}
            >
              <View style={[styles.dateCircle, showCircle && styles.outlinedCircle]}>
                <Text style={[styles.dateText, !isCurrentMonth && styles.fadedText, showCircle && styles.outlinedText]}>
                  {date.getDate()}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "white", flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  month: { fontSize: 20, fontWeight: "bold" },
  dayRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  sunday: { color: "tomato", fontWeight: "bold", textAlign: "center", width: 32 },
  saturday: { color: "skyblue", fontWeight: "bold", textAlign: "center", width: 32 },
  weekday: { color: "gray", fontWeight: "bold", textAlign: "center", width: 32 },
  dateGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateCell: {
    width: "14.285%",
    alignItems: "center",
    marginVertical: 6,
  },
  dateCircle: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  outlinedCircle: {
    borderWidth: 1.5,
    borderColor: "#007bff",
  },
  dateText: {
    fontSize: 14,
    color: "#222",
  },
  outlinedText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  fadedText: {
    color: "#ccc",
  },
});
