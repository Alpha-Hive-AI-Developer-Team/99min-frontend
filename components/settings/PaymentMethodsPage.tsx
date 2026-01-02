"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import AddPaymentMethodCard from './AddPaymentMethodCard';
import PaymentMethodCard from './PaymentMethodCard';
import AddPaymentMethodModal from './AddPaymentMethodModal';
import RemovePaymentMethodModal from './RemovePaymentMethodModal';

interface PaymentMethod {
  id: string;
  cardType: 'visa' | 'mastercard' | 'amex' | 'discover';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

interface PaymentMethodsPageProps {
  onBack?: () => void;
}

const PaymentMethodsPage: React.FC<PaymentMethodsPageProps> = ({ onBack }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      cardType: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '25',
      isDefault: true,
    },
    {
      id: '2',
      cardType: 'mastercard',
      last4: '5555',
      expiryMonth: '12',
      expiryYear: '25',
      isDefault: false,
    },
  ]);

  const handleSetDefault = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDeleteClick = (id: string) => {
    setSelectedPaymentMethodId(id);
    setIsRemoveModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedPaymentMethodId) {
      setPaymentMethods((prev) => {
        const updated = prev.filter((method) => method.id !== selectedPaymentMethodId);
        // If we deleted the default, set the first one as default
        if (updated.length > 0 && prev.find((m) => m.id === selectedPaymentMethodId)?.isDefault) {
          updated[0].isDefault = true;
        }
        return updated;
      });
      setSelectedPaymentMethodId(null);
    }
  };

  const handleAddPaymentMethod = () => {
    setIsAddModalOpen(true);
  };

  const handleSubmitCard = (cardData: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
  }) => {
    // Extract card type (simplified - in real app, use card number to detect)
    const cardType = cardData.cardNumber.startsWith('4') ? 'visa' : 
                     cardData.cardNumber.startsWith('5') ? 'mastercard' :
                     cardData.cardNumber.startsWith('3') ? 'amex' : 'discover';
    
    // Extract last 4 digits
    const last4 = cardData.cardNumber.slice(-4);
    
    // Parse expiry date (MM/YY format)
    const [expiryMonth, expiryYear] = cardData.expiryDate.split('/');
    
    // Add new payment method
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      cardType,
      last4,
      expiryMonth,
      expiryYear,
      isDefault: paymentMethods.length === 0, // First card is default
    };
    
    setPaymentMethods((prev) => [...prev, newMethod]);
    setIsAddModalOpen(false);
    
    console.log('Card added:', cardData);
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Payment Methods" onBack={onBack} maxWidth="7xl" />
      
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-4">
        {/* Add Payment Method Card */}
        <AddPaymentMethodCard onClick={handleAddPaymentMethod} />

        {/* Payment Methods List */}
        {paymentMethods.length > 0 && (
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.id}
                cardType={method.cardType}
                last4={method.last4}
                expiryMonth={method.expiryMonth}
                expiryYear={method.expiryYear}
                isDefault={method.isDefault}
                onSetDefault={() => handleSetDefault(method.id)}
                onDelete={() => handleDeleteClick(method.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Payment Method Modal */}
      <AddPaymentMethodModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleSubmitCard}
      />

      {/* Remove Payment Method Modal */}
      <RemovePaymentMethodModal
        isOpen={isRemoveModalOpen}
        onClose={() => {
          setIsRemoveModalOpen(false);
          setSelectedPaymentMethodId(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default PaymentMethodsPage;

