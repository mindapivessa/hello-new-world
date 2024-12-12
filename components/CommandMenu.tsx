'use client';

import { Command } from 'cmdk';
import { useEffect, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onOpenChange(!open);
    }
  }, [open, onOpenChange]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Global Command Menu"
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-black/95 rounded-lg border border-white/20 backdrop-blur-sm"
    >
      <Dialog.Title className="sr-only">Command Menu</Dialog.Title>
      <div className="flex flex-col">
        <Command.Input 
          className="w-full px-4 py-3 text-white bg-transparent border-b border-white/20 outline-none placeholder:text-white/50"
          placeholder="Type a command or search..."
        />
        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Empty className="p-2 text-sm text-white/50">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="p-2">
            <Command.Item 
              className="p-2 text-sm text-white rounded hover:bg-white/10 cursor-pointer"
              onSelect={() => {
                window.location.href = '/';
                onOpenChange(false);
              }}
            >
              Go to Home
            </Command.Item>
            <Command.Item 
              className="p-2 text-sm text-white rounded hover:bg-white/10 cursor-pointer"
              onSelect={() => {
                window.location.href = '/here';
                onOpenChange(false);
              }}
            >
              Go to Here
            </Command.Item>
          </Command.Group>

          <Command.Separator className="h-px bg-white/20 my-2" />

          <Command.Group heading="Theme" className="p-2">
            <Command.Item 
              className="p-2 text-sm text-white rounded hover:bg-white/10 cursor-pointer"
              onSelect={() => {
                // Add theme toggle logic here
                onOpenChange(false);
              }}
            >
              Toggle theme
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
} 