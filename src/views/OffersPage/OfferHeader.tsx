import { OfferSearchRequest } from '@/interfaces/OfferInterface';
import React from 'react';
import FilterComponent from './filters/FilterComponent';

interface OfferHeaderProps {
    defaultFilter: OfferSearchRequest;
    setFilter: React.Dispatch<React.SetStateAction<OfferSearchRequest>>;
}

const OfferHeader: React.FC<OfferHeaderProps> = ({ defaultFilter, setFilter }) => {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <FilterComponent defaultFilter={defaultFilter} setFilter={setFilter} />
        </div>
    );
};

export default OfferHeader;
