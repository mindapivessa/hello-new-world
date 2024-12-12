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
    if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onOpenChange(!open);
    }
  }, [open, onOpenChange]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        
        {/* Content */}
        <Dialog.Content className="fixed top-[20%] left-1/2 -translate-x-1/2 max-w-[640px] w-full bg-[#1C1C1E] rounded-xl border border-white/10 shadow-2xl z-[60]">
          <Dialog.Title className="sr-only">Command Menu</Dialog.Title>
          
          <Command>
            <Command.Input 
              className="w-full px-4 h-14 text-base text-white/90 bg-transparent border-b border-white/10 outline-none placeholder:text-white/40"
              placeholder="Search for apps and commands..."
            />
            <Command.List className="py-2 max-h-[60vh] overflow-y-auto">
              <div className="px-3 py-2 text-xs text-white/50">Suggestions</div>
              
              {/* Applications */}
              <Command.Group>
                {[
                  { name: 'Linear', icon: '🔵' },
                  { name: 'Figma', icon: '🎨' },
                  { name: 'Slack', icon: '💬' },
                  { name: 'YouTube', icon: '🎥' },
                  { name: 'Raycast', icon: '⚡' },
                ].map((app) => (
                  <Command.Item 
                    key={app.name}
                    className="px-3 py-2 mx-2 flex items-center justify-between rounded-md hover:bg-white/10 cursor-pointer"
                    onSelect={() => {
                      console.log(`Selected ${app.name}`);
                      onOpenChange(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{app.icon}</span>
                      <span className="text-white/90">{app.name}</span>
                    </div>
                    <span className="text-sm text-white/40">Application</span>
                  </Command.Item>
                ))}
              </Command.Group>

              <div className="px-3 py-2 mt-2 text-xs text-white/50">Commands</div>
              
              {/* Commands */}
              <Command.Group>
                {[
                  { name: 'Clipboard History', icon: '📋' },
                  { name: 'Import Extension', icon: '🔌' },
                ].map((command) => (
                  <Command.Item 
                    key={command.name}
                    className="px-3 py-2 mx-2 flex items-center justify-between rounded-md hover:bg-white/10 cursor-pointer"
                    onSelect={() => {
                      console.log(`Executed ${command.name}`);
                      onOpenChange(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{command.icon}</span>
                      <span className="text-white/90">{command.name}</span>
                    </div>
                    <span className="text-sm text-white/40">Command</span>
                  </Command.Item>
                ))}
              </Command.Group>

              {/* Footer */}
              <div className="mt-4 px-3 py-3 border-t border-white/10 flex items-center justify-between text-sm text-white/40">
                <div>Open Application</div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10">↵</kbd>
                    <span>Actions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10">⌘</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10">B</kbd>
                  </div>
                </div>
              </div>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 