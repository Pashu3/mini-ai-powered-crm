import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Tag, Trash2 } from "lucide-react";
import Link from "next/link";
import { Lead, LeadStage } from "@/types/lead";
import { getStageColor, getSourceColor } from "@/utils/styleHelpers";

interface KanbanViewProps {
  leads: Lead[];
  onDeleteLead: (id: string) => void;
  formatDate: (date: string) => string;
}

export default function KanbanView({
  leads,
  onDeleteLead,
  formatDate
}: KanbanViewProps) {
  // Group leads by stage for Kanban view
  const leadsByStage = {
    NEW: leads.filter(lead => lead.stage === 'NEW'),
    CONTACTED: leads.filter(lead => lead.stage === 'CONTACTED'),
    QUALIFIED: leads.filter(lead => lead.stage === 'QUALIFIED'),
    PROPOSAL: leads.filter(lead => lead.stage === 'PROPOSAL'),
    NEGOTIATION: leads.filter(lead => lead.stage === 'NEGOTIATION'),
    CONVERTED: leads.filter(lead => lead.stage === 'CONVERTED'),
    LOST: leads.filter(lead => lead.stage === 'LOST')
  };

  const stages: LeadStage[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CONVERTED', 'LOST'];

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex gap-4 min-w-[1000px]">
        {stages.map(stage => (
          <div key={stage} className="flex-1 min-w-[250px]">
            <div 
              className="rounded-t-md py-2 px-3 font-medium text-sm flex items-center justify-between"
              style={{ 
                backgroundColor: `${getStageColor(stage)}20`, 
                color: getStageColor(stage),
                borderBottom: '1px solid var(--border)' 
              }}
            >
              <span>
                {stage.charAt(0) + stage.slice(1).toLowerCase()}
              </span>
              <span className="text-xs opacity-70 font-normal">
                ({leadsByStage[stage].length})
              </span>
            </div>

            <div className="bg-muted/20 rounded-b-md h-[calc(100vh-300px)] overflow-y-auto p-2 space-y-2">
              {leadsByStage[stage].length === 0 ? (
                <div className="flex items-center justify-center h-24 border border-dashed border-border/50 rounded-md">
                  <p className="text-sm text-muted-foreground">No leads</p>
                </div>
              ) : (
                leadsByStage[stage].map(lead => (
                  <motion.div
                    key={lead.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-md border hover:border-border hover:shadow-sm transition-all group ${
                      lead.isArchived ? 'bg-muted/50 border-border/30 text-muted-foreground' : 
                      lead.isDeleted ? 'bg-destructive/5 border-destructive/20 text-muted-foreground' :
                      'bg-card border-border/60 hover:bg-primary/5'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <Link href={`/dashboard/leads/${lead.id}`} className="font-medium hover:text-primary transition-colors text-sm mb-1 block">
                        {lead.name}
                        {lead.isArchived && <span className="ml-2 text-xs opacity-70">(Archived)</span>}
                        {lead.isDeleted && <span className="ml-2 text-xs opacity-70">(Deleted)</span>}
                      </Link>
                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/dashboard/leads/${lead.id}`}
                          className="p-1 rounded-md hover:bg-primary/10 transition-colors"
                        >
                          <Edit size={14} />
                          <span className="sr-only">Edit</span>
                        </Link>
                        <button
                          onClick={() => onDeleteLead(lead.id)}
                          className="p-1 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                          <Trash2 size={14} />
                          <span className="sr-only">Delete</span>
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {lead.company || 'No company'}
                    </div>
                    
                    {/* Show source as badge */}
                    {lead.source && (
                      <div className="mb-2">
                        <span 
                          className="inline-block px-2 py-0.5 text-xs rounded-full" 
                          style={{
                            backgroundColor: `${getSourceColor(lead.source)}20`,
                            color: getSourceColor(lead.source)
                          }}
                        >
                          {lead.source.charAt(0) + lead.source.slice(1).toLowerCase().replace('_', ' ')}
                        </span>
                      </div>
                    )}
                    
                    {/* Show confidence and priority indicators */}
                    <div className="flex justify-between mb-2">
                      {lead.confidence !== undefined && (
                        <div className="text-xs flex items-center">
                          <span className="mr-1">Confidence:</span>
                          <div className="w-12 bg-muted rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                (lead.confidence) > 70 ? 'bg-success' : 
                                (lead.confidence) > 40 ? 'bg-primary' : 'bg-muted-foreground/50'
                              }`} 
                              style={{ width: `${lead.confidence}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {lead.priority !== undefined && (
                        <div className="text-xs flex items-center">
                          <span className="mr-1">Priority:</span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div 
                                key={i} 
                                className={`w-1 h-3 rounded-sm ${
                                  (lead.priority || 0) > i ? 'bg-primary' : 'bg-muted'
                                }`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Show tags if available */}
                    {lead.tags && lead.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {lead.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="bg-muted-foreground/10 text-muted-foreground text-xs rounded-full px-2 py-0.5 flex items-center">
                            <Tag size={8} className="mr-1" />
                            {tag}
                          </span>
                        ))}
                        {lead.tags.length > 2 && (
                          <span className="bg-muted-foreground/10 text-muted-foreground text-xs rounded-full px-2 py-0.5">
                            +{lead.tags.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Additional metadata */}
                    <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                      <div>{formatDate(lead.createdAt)}</div>
                      {lead.region && <div>{lead.region}</div>}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}