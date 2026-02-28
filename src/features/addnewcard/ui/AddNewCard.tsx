'use client';

import { useCallback, useState } from 'react';
import { AddNewCardProvider } from '../model/contexts/AddNewCardContext';
import { AddCardStep } from './addCardStep/AddCardStep';
import { EditingCriteriaStep } from './editingCriteriaStep/EditingCriteriaStep';

export function AddNewCard() {
	const [stepNumber, setStepNumber] = useState<number>(1);
	console.log('AddNewCard rendered');

	const renderStep = useCallback(() => {
		switch (stepNumber) {
			case 1:
				return <AddCardStep setNewStep={setStepNumber} />;
			case 2:
				return <EditingCriteriaStep />;
		}
	}, [stepNumber]);

	return <AddNewCardProvider>{renderStep()}</AddNewCardProvider>;
}
