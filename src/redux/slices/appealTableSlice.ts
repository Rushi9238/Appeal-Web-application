import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TaxRecord = {
  id: string; // Added ID for CRUD operations
  taxYear: string | number;
  company: string;
  state: string;
  assessor: string;
  accountNumber: string;
  appealDeadline: string;
  status: 'Sent' | 'Not Sent';
  appealedDate: string | null;
  appliedBy: string | null;
  onEdit?: () => void; // Optional edit function
  onDelete?: () => void; // Optional delete function
};

interface TableState {
  items: TaxRecord[];
  isLoading: boolean;
  error: string | null;
}

const generateFakeTaxRecords = (count: number): TaxRecord[] => {
  const states = ['California', 'Texas', 'New York', 'Florida', 'Nevada', 'Illinois', 'Ohio'];
  const companies = ['ABC Corp', 'XYZ Inc', 'GlobalTech', 'MediPlus', 'Sunrise LLC', 'NovaSoft', 'BlueOcean'];
  const assessors = ['John Doe', 'Jane Smith', 'Robert Lee', 'Lisa Wong', 'Mike Ross', 'Karen Hill', 'Tom Adams'];
  const appliedByNames = ['Alice Johnson', 'Mark Twain', 'Rachel Green', 'Kevin Stone', 'Emma West'];

  return Array.from({ length: count }, (_, index) => {
    const isSent = Math.random() > 0.5;
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const deadlineDate = new Date(2024, randomMonth, randomDay);
    const appealedDate = isSent ? new Date(2024, randomMonth - 1, Math.max(1, randomDay - 5)) : null;

    return {
      id: `TR${index + 1}`, // Unique ID
      taxYear: 2024,
      company: companies[index % companies.length],
      state: states[index % states.length],
      assessor: assessors[index % assessors.length],
      accountNumber: `ACC${100000 + index}`,
      appealDeadline: deadlineDate.toISOString().split('T')[0],
      status: isSent ? 'Sent' : 'Not Sent',
      appealedDate: isSent ? appealedDate!.toISOString().split('T')[0] : "Not Applicable",
      appliedBy: isSent ? appliedByNames[index % appliedByNames.length] : "Not Applicable",
    };
  });
};

const initialState: TableState = {
  items: generateFakeTaxRecords(40),
  isLoading: false,
  error: null,
};

const appealTableSlice = createSlice({
  name: 'taxRecords',
  initialState,
  reducers: {
    fetchRecordsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchRecordsSuccess: (state, action: PayloadAction<TaxRecord[]>) => {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchRecordsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addRecord: (state, action: PayloadAction<Omit<TaxRecord, 'id'>>) => {
      const newRecord: TaxRecord = {
        id: `TR${state.items.length + 1}`,
        ...action.payload,
      };
      state.items.unshift(newRecord);
    },
    updateRecord: (state, action: PayloadAction<Partial<TaxRecord> & { id: string }>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteRecord: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  fetchRecordsStart,
  fetchRecordsSuccess,
  fetchRecordsFailure,
  addRecord,
  updateRecord,
  deleteRecord,
} = appealTableSlice.actions;

export default appealTableSlice.reducer;