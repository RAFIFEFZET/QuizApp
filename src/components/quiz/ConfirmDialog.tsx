"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  onConfirm,
  onCancel,
  isDestructive = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-card w-full max-w-md rounded-xl border border-primary/20 shadow-lg p-6 animate-in zoom-in-95 duration-150">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-6 text-muted-foreground">{message}</p>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onCancel} className="px-4 py-2">
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className={`px-4 py-2 ${
              isDestructive ? "bg-red-600 hover:bg-red-700" : ""
            }`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
