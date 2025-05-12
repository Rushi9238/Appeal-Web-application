'use client';

import * as XLSX from 'xlsx';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { DataTable } from '@/components/DataTable';
import { columns } from './columns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/Button';
import { EllipsisVertical, FolderDown } from 'lucide-react';
import { TaxRecord, updateRecord, deleteRecord, addRecord } from '@/redux/slices/appealTableSlice';

const initialFormData: TaxRecord = {
  id: '',
  taxYear: '',
  company: '',
  state: '',
  assessor: '',
  accountNumber: '',
  appealDeadline: '',
  status: 'Not Sent', // Default status for new records
  appliedBy: '',
  appealedDate: '',
};

export default function TablePage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.table.items);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TaxRecord>({} as TaxRecord);
  const [formData, setFormData] = useState<TaxRecord>(initialFormData);

  const handleEdit = (user: TaxRecord) => {
    setSelectedUser(user);
    setFormData(user);
    setAddDialogOpen(true);
  };

  const handleDelete = (user: TaxRecord) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    if (selectedUser.id) {
      dispatch(updateRecord({ ...formData, id: selectedUser.id }));
    } else {
      dispatch(addRecord(formData));
    }
    setAddDialogOpen(false);
    setFormData(initialFormData);
  };

  const handleConfirmDelete = () => {
    if (selectedUser.id) {
      dispatch(deleteRecord(selectedUser.id));
    }
    setDeleteDialogOpen(false);
    setSelectedUser({} as TaxRecord);
  };

   const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(users); // Convert users data to a worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tax Records');
    XLSX.writeFile(workbook, 'TaxRecords.xlsx'); // Download the file
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Appeals Letter</h1>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => {
              setSelectedUser({} as TaxRecord);
              setAddDialogOpen(true);
            }}
            className="text-center bg-[#3fc3ac] text-white px-4 py-2 rounded hover:bg-[#3fc3adc1] cursor-pointer"
          >
            Add Tax Record
          </Button>
          <DropdownMenu >
            <DropdownMenuTrigger asChild >
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 outline-0">
                <EllipsisVertical color='#3fc3ac' />
              </button>
            </DropdownMenuTrigger> 
            <DropdownMenuContent className='bg-white shadow-lg rounded-md'>
              <DropdownMenuItem onClick={handleExport} className='text-gray-600'> <FolderDown className='mr-2' /> Export</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <DataTable
        columns={columns(handleEdit, handleDelete)} // Call the columns function here
        data={users}
      />

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className='bg-white rounded-lg shadow-lg'>
          <DialogHeader>
            <DialogTitle>{selectedUser.id ? 'Edit Tax Record' : 'Add Tax Record'}</DialogTitle>
            <DialogDescription>
              {selectedUser.id
                ? 'Edit the details of the selected Tax Record.'
                : 'Fill in the details to add a new Tax Record.'}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className='grid grid-cols-2 gap-4'>
              <div className="space-y-4">
                {/* Tax Year */}
                <label className="text-sm">Select Tax Year</label>
                <select
                  value={formData.taxYear || ''}
                  onChange={(e) => setFormData({ ...formData, taxYear: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  disabled={!!selectedUser.id} // Disable for editing
                >
                  <option value="" disabled>
                    Select Tax Year
                  </option>
                  {Array.from({ length: 21 }, (_, i) => {
                    const year = new Date().getFullYear() - i; // Generate years from now to 20 years ago
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>

                {/* Company */}
                <label className='text-sm'>Add Company Name</label>
                <input
                  type="text"
                  placeholder="Company"
                  value={formData.company || ''}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  disabled={!!selectedUser.id} // Disable for editing
                />

                {/* State */}
                <label className='text-sm'>Add State Name</label>
                <input
                  type="text"
                  placeholder="State"
                  value={formData.state || ''}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  disabled={!!selectedUser.id} // Disable for editing
                />

                {/* Assessor */}
                <label className='text-sm'>Add Assessor</label>
                <input
                  type="text"
                  placeholder="Assessor"
                  value={formData.assessor || ''}
                  onChange={(e) => setFormData({ ...formData, assessor: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  disabled={!!selectedUser.id} // Disable for editing
                />

                {/* Account Number */}
                <label className='text-sm'>Add Account Number</label>
                <input
                  type="text"
                  placeholder="Account Number"
                  value={formData.accountNumber || ''}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  disabled={!!selectedUser.id} // Disable for editing
                />

              </div>
              <div className="space-y-4">
                {/* Appeal Deadline */}
                <label className='text-sm'>Select Appeal Deadline</label>
                <input
                  type="date"
                  placeholder="Appeal Deadline"
                  value={formData.appealDeadline || ''}
                  onChange={(e) => setFormData({ ...formData, appealDeadline: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  disabled={!!selectedUser.id} // Disable for editing
                />

                {/* Status */}
                <label className='text-sm'>Select Status</label>
                <select
                  value={formData.status || 'Not Sent'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "Not Sent" | "Sent" })}
                  className="w-full border rounded px-3 py-2"
                  disabled={!selectedUser.id}
                >
                  <option value="Not Sent">Not Sent</option>
                  <option value="Sent">Sent</option>
                </select>

                {/* Applied By */}
                <label className='text-sm'>Add Applied By</label>
                <input
                  type="text"
                  placeholder="Applied By"
                  value={formData.appliedBy === 'Not Applicable' ? '' : formData.appliedBy || ''}
                  onChange={(e) => setFormData({ ...formData, appliedBy: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  disabled={!selectedUser.id} // Enable only for editing
                />

                {/* Appealed Date */}
                <label className='text-sm'>Select Appealed Date</label>
                <input
                  type="date"
                  placeholder="Appealed Date"
                  value={formData.appealedDate || ''}
                  onChange={(e) => setFormData({ ...formData, appealedDate: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  disabled={!selectedUser.id} // Enable only for editing
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className=' text-center bg-[#3fc3ac] text-white' type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className='bg-white rounded-lg shadow-lg'>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this Tax Record?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button className=' text-center bg-[#c3433f] text-white' variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}