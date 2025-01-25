import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
import { SiCashapp } from '@react-icons/all-files/si/SiCashapp';
import InputWithLabel from '@/components/utilities/Inputs/InputWithLabel/InputWithLabel';
import { put } from '@/lib/axiosHelper';
import { useAuth } from '@/contexts/AuthProvider';
import { toast } from 'sonner';

const AddCash: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const { user } = useAuth();

    const handleAddFunds = () => {
        if (amount.length === 0) return;

        put('/api/Users/add-cash', { id: user?.id, cash: amount })
            .then(response => {
                toast.info(response.data.message);
            })
            .catch(e => {
                toast.error(e.message);
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (/^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
    };

    return (
        <div>
            <div className="flex gap-2 items-center" onClick={() => setOpen(true)}>
                <SiCashapp />
                <span>Add Funds</span>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Add Funds</DialogTitle>
                        <DialogDescription>You need it to purchase things</DialogDescription>
                    </DialogHeader>
                    <InputWithLabel name="amount" type="text" value={amount} onChange={handleChange} pattern="[0-9]*" />
                    <div className="flex justify-between">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Go Back
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="default" onClick={handleAddFunds}>
                                Add Funds
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddCash;
