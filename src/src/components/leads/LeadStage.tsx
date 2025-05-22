"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Loader2, Target, Check } from "lucide-react";
import { Lead, LeadStage as LeadStageType } from "@/types/lead";

interface LeadStageProps {
  lead: Lead;
  stageChanging: boolean;
  handleStageChange: (newStage: LeadStageType) => Promise<void>;
  getStageColor: (stage: LeadStageType) => string;
}

const LeadStageComponent = ({
  lead,
  stageChanging,
  handleStageChange,
  getStageColor,
}: LeadStageProps) => {
  const [currentStage, setCurrentStage] = useState<LeadStageType>(lead.stage);

  useEffect(() => {
    if (lead?.stage) {
      setCurrentStage(lead.stage);
    }
  }, [lead?.stage]);

  // Make sure this matches the enum in your types
  const stages: LeadStageType[] = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "NEGOTIATION", "CONVERTED", "LOST"];

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
      <h3 className="font-medium mb-4 flex items-center gap-2">
        <Target size={18} />
        Lead Stage
      </h3>
      <div className="space-y-2">
        {stages.map((stage) => (
          <button
            key={stage}
            onClick={() => handleStageChange(stage)}
            disabled={currentStage === stage || stageChanging}
            className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
              currentStage === stage
                ? getStageColor(stage)
                : 'hover:bg-accent transition-colors'
            }`}
          >
            <span>{stage.charAt(0) + stage.slice(1).toLowerCase()}</span>
            {currentStage === stage && <Check size={16} />}
          </button>
        ))}
      </div>
      {stageChanging && (
        <div className="mt-3 flex items-center justify-center text-primary">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Updating stage...
        </div>
      )}
    </div>
  );
};

export default LeadStageComponent;