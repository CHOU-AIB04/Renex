"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuX } from "react-icons/lu";
import GhlForm from "./GhlForm";

export default function LeadFormDialog({ trigger }) {
  return (
    <Dialog>
      <DialogTrigger render={trigger} />

      <DialogContent
        showCloseButton={false}
        className="w-[calc(100vw-2rem)] sm:max-w-3xl overflow-hidden rounded-3xl border-none p-0"
      >
        {/* Header */}
        <div className="relative bg-black px-7 pb-7 pt-7 sm:px-10">
          <DialogClose
            aria-label="Fermer"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <LuX size={18} />
          </DialogClose>

          <span className="block t-eyebrow text-brand-indigo">
            Étude gratuite
          </span>
          <DialogTitle className="mt-2 pr-12 text-2xl sm:text-3xl font-extrabold text-white">
            Demandez votre simulation solaire
          </DialogTitle>
          <DialogDescription className="mt-1.5 text-sm text-gray-400">
            Sans engagement · Réponse en moins de 24h
          </DialogDescription>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto bg-white px-7 py-8 sm:px-10">
          <GhlForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
