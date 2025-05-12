"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import { PageHeader } from "@/components/page-header";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addEvent, deleteEvent, updateEvent } from "@/redux/slices/calenderSlice";

// Define event types
interface CalendarEvent {
  id: string;
  date: string; // ISO string for easier serialization
  title: string;
  description: string;
  type: "event" | "reminder";
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [newEvent, setNewEvent] = useState<Omit<CalendarEvent, "id">>({
    date: new Date().toISOString(),
    title: "",
    description: "",
    type: "event",
  });

  // Redux hooks
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.calendar.events);

  // Calendar navigation
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  // Get days for the current month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(new Date(event.date), date));
  };

  // Handle adding a new event
  const handleAddEvent = () => {
    if (!newEvent.title) return;

    dispatch(addEvent(newEvent));
    setIsAddDialogOpen(false);
    resetNewEvent();
  };

  // Handle deleting an event
  const handleDeleteEvent = (id: string) => {
    dispatch(deleteEvent(id));
    setIsViewDialogOpen(false);
  };

  // Reset new event form
  const resetNewEvent = () => {
    setNewEvent({
      date: new Date().toISOString(),
      title: "",
      description: "",
      type: "event",
    });
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);

    // Check if there are events for this date
    const dateEvents = getEventsForDate(date);
    if (dateEvents.length > 0) {
      // If there's only one event, show it directly
      if (dateEvents.length === 1) {
        setSelectedEvent(dateEvents[0]);
        setIsViewDialogOpen(true);
      } else {
        // Otherwise, show the add dialog with options to view events
        setNewEvent((prev) => ({ ...prev, date: date.toISOString() }));
        setIsAddDialogOpen(true);
      }
    } else {
      // No events, show add dialog
      setNewEvent((prev) => ({ ...prev, date: date.toISOString() }));
      setIsAddDialogOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">{format(currentDate, "MMMM yyyy")}</h2>
            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={() => {
              setNewEvent({ ...newEvent, date: new Date().toISOString() });
              setIsAddDialogOpen(true);
            }}
            className="text-center bg-[#3fc3ac] text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>

        <div className="grid grid-cols-7 border-2 border-[#3fc3ac] gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
          {/* Day headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="bg-gray-100 dark:bg-gray-800 p-2 text-center font-medium">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {daysInMonth.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const hasEvents = dayEvents.length > 0;
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={index}
                className={`min-h-24 bg-white dark:bg-gray-950 p-2 relative 
                    ${!isSameMonth(day, currentDate) && "text-gray-400 dark:text-gray-600"}
                    ${isToday && "bg-blue-50 dark:bg-blue-950"}`}
                onClick={() => handleDateClick(day)}
              >
                <div className="flex justify-between">
                  <span
                    className={`text-sm font-medium ${isToday && "text-blue-600 dark:text-blue-400"}`}
                  >
                    {format(day, "d")}
                  </span>
                  {hasEvents && (
                    <span className="flex space-x-1">
                      {dayEvents.some((e) => e.type === "event") && (
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                      )}
                      {dayEvents.some((e) => e.type === "reminder") && (
                        <span className="h-2 w-2 rounded-full bg-yellow-500" />
                      )}
                    </span>
                  )}
                </div>

                {/* Event previews */}
                <div className="mt-1 space-y-1 max-h-16 overflow-y-auto scrollbar-hide">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded truncate
                        ${
                          event.type === "event"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                        setIsViewDialogOpen(true);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              {newEvent.date && `Create an event for ${format(new Date(newEvent.date), "MMMM d, yyyy")}`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="event-date" className="text-sm font-medium">
                Date
              </label>
              <input
                type="date"
                id="event-date"
                value={format(new Date(newEvent.date), "yyyy-MM-dd")}
                onChange={(e) => setNewEvent({ ...newEvent, date: parseISO(e.target.value).toISOString() })}
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="event-title" className="text-sm font-medium">
                Title
              </label>
              <input
                id="event-title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Enter event title"
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="event-description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="event-description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Enter event description"
                className="flex min-h-[80px] w-full rounded-md border border-gray-300 px-3 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Type</label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="event"
                    name="event-type"
                    value="event"
                    checked={newEvent.type === "event"}
                    onChange={() => setNewEvent({ ...newEvent, type: "event" })}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="event" className="text-sm cursor-pointer">
                    Event
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="reminder"
                    name="event-type"
                    value="reminder"
                    checked={newEvent.type === "reminder"}
                    onChange={() => setNewEvent({ ...newEvent, type: "reminder" })}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="reminder" className="text-sm cursor-pointer">
                    Reminder
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Event Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              {selectedEvent?.date && format(new Date(selectedEvent.date), "MMMM d, yyyy")}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center space-x-2 mb-4">
              <div
                className={`h-3 w-3 rounded-full ${
                  selectedEvent?.type === "event" ? "bg-blue-500" : "bg-yellow-500"
                }`}
              />
              <span className="capitalize">{selectedEvent?.type}</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedEvent?.description || "No description provided."}
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setNewEvent({ ...newEvent, date: selectedEvent?.date || new Date().toISOString() });
                setIsViewDialogOpen(false);
                setIsAddDialogOpen(true);
              }}
            >
              Add Event
            </Button>
            <Button variant="destructive" onClick={() => selectedEvent && handleDeleteEvent(selectedEvent.id)}>
              Delete
            </Button>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}