import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalendarEvent {
  id: string;
  date: string; // ISO string for easier serialization
  title: string;
  description: string;
  type: "event" | "reminder";
}

interface CalendarState {
  events: CalendarEvent[];
}

const initialState: CalendarState = {
  events: [
    {
      id: "1",
      date: "2025-05-15",
      title: "Team Meeting",
      description: "Discuss project progress",
      type: "event",
    },
    {
      id: "2",
      date: "2025-05-20",
      title: "Deadline Reminder",
      description: "Project submission deadline",
      type: "reminder",
    },
  ],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Omit<CalendarEvent, "id">>) => {
      const id = Math.random().toString(36).substring(2, 9);
      state.events.push({ id, ...action.payload });
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
    updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
      const index = state.events.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    getEventsForDate: (state, action: PayloadAction<string>) => {
      return state.events.filter((event) => event.date === action.payload);
    },
  },
});

export const { addEvent, deleteEvent, updateEvent, getEventsForDate } = calendarSlice.actions;

export default calendarSlice.reducer;