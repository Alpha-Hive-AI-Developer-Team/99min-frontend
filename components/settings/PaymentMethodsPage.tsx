"use client";

import React, { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import AddPaymentMethodCard from "./AddPaymentMethodCard";
import PaymentMethodCard from "./PaymentMethodCard";
import AddPaymentMethodModal from "./AddPaymentMethodModal";
import RemovePaymentMethodModal from "./RemovePaymentMethodModal";
import { usePaymentMethods } from "@/hooks/UsePaymentMethod";

interface PaymentMethodsPageProps {
  onBack?: () => void;
}

// FIX: define the accepted card brand type instead of using `any`
type CardBrand = "visa" | "mastercard" | "amex" | "discover";

const VALID_BRANDS = new Set<CardBrand>(["visa", "mastercard", "amex", "discover"]);

function toCardBrand(brand?: string): CardBrand {
  if (brand && VALID_BRANDS.has(brand as CardBrand)) return brand as CardBrand;
  return "visa";
}

const PaymentMethodsPage: React.FC<PaymentMethodsPageProps> = ({ onBack }) => {
  const { methods, loading, saving, error, handleAdd, handleSetDefault, handleDelete } =
    usePaymentMethods();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedMethodId(id);
    setIsRemoveModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedMethodId) {
      await handleDelete(selectedMethodId);
      setSelectedMethodId(null);
      setIsRemoveModalOpen(false);
    }
  };

  const detectBrand = (cardNumber: string): CardBrand => {
    if (cardNumber.startsWith("4")) return "visa";
    if (cardNumber.startsWith("5")) return "mastercard";
    if (cardNumber.startsWith("3")) return "amex";
    return "discover";
  };

  const handleSubmitCard = async (cardData: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
  }) => {
    const [expMonth, expYear] = cardData.expiryDate.split("/");
    const brand = detectBrand(cardData.cardNumber);

    const success = await handleAdd({
      stripePaymentMethodId: `pm_stub_${Date.now()}`,
      type: "card",
      brand,
      last4: cardData.cardNumber.slice(-4),
      expMonth: Number(expMonth),
      expYear: Number(expYear),
      isDefault: methods.length === 0,
    });

    if (success) setIsAddModalOpen(false);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <PageHeader title="Payment Methods" onBack={onBack} maxWidth="7xl" />
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Payment Methods" onBack={onBack} maxWidth="7xl" />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>
        )}

        <AddPaymentMethodCard onClick={() => setIsAddModalOpen(true)} />

        {methods.length > 0 && (
          <div className="space-y-3">
            {methods.map((method) => (
              <PaymentMethodCard
                key={method._id}
                // FIX: use toCardBrand() helper instead of `as any`
                cardType={toCardBrand(method.brand)}
                last4={method.last4 ?? "****"}
                expiryMonth={String(method.expMonth ?? "").padStart(2, "0")}
                expiryYear={String(method.expYear ?? "").slice(-2)}
                isDefault={method.isDefault}
                onSetDefault={() => handleSetDefault(method._id)}
                onDelete={() => handleDeleteClick(method._id)}
              />
            ))}
          </div>
        )}
      </div>

      <AddPaymentMethodModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleSubmitCard}
      />

      <RemovePaymentMethodModal
        isOpen={isRemoveModalOpen}
        onClose={() => {
          setIsRemoveModalOpen(false);
          setSelectedMethodId(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default PaymentMethodsPage;