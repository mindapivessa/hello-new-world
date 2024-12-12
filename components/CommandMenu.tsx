'use client';

import { Command } from 'cmdk';
import { useEffect, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { toast } from 'sonner';

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
    
    if (e.key === 'd' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      window.open('https://docs.base.dev', '_blank');
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
        <Dialog.Content className="fixed top-[20%] left-1/2 -translate-x-1/2 max-w-[640px] w-full bg-black rounded-xl border border-white/10 shadow-2xl z-[60]">
          <Dialog.Title className="sr-only">Command Menu</Dialog.Title>
          
          <Command>
            <Command.Input 
              className="w-full px-4 h-14 text-base text-white/90 bg-transparent border-b border-white/10 outline-none placeholder:text-white/40"
              placeholder="Search by products, solutions, or templates..."
            />
            <Command.List className="pt-4 mt-2 max-h-[60vh] overflow-y-auto">
            {/* Quickstart  */}
              <div className="px-3 py-2 text-xs text-white/50">Quickstart</div>
              <Command.Group
                className="mb-2">
                {[
                  { name: 'npm create onchain', type: 'command', value: 'npm create onchain' },
                  { name: 'Launch an agent', type: 'link', value: 'https://github.com/coinbase/onchain-agent-demo' },
                  { name: 'Deploy an onchain store', type: 'link', value: 'https://docs.base.org/templates/social' }
                ].map((item) => (
                  <Command.Item 
                    key={item.name}
                    className="px-3 py-2 mx-2 flex items-center justify-between rounded-md hover:bg-white/10 cursor-pointer"
                    onSelect={() => {
                      if (item.type === 'command') {
                        navigator.clipboard.writeText(item.value)
                          .then(() => {
                            toast('Copied to clipboard');
                          })
                          .catch((err) => {
                            console.error('Failed to copy:', err);
                            toast.error('Failed to copy to clipboard');
                          });
                      } else {
                        window.open(item.value, '_blank');
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white/90">{item.name}</span>
                    </div>
                    {item.type === 'command' ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-white/40"
                      >
                        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-white/40"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    )}
                  </Command.Item>
                ))}
              </Command.Group>

            {/* By products */}
              <div className="px-3 py-2 text-xs text-white/50">By products</div>
              <Command.Group
                className="mb-2">
                {[
                  { name: 'OnchainKit', url: 'https://github.com/coinbase/onchainkit' },
                  { name: 'AgentKit', url: 'https://github.com/coinbase/agentkit' },
                  { name: 'Paymaster', url: 'https://docs.base.org/base-paymaster' },
                  { name: 'L3 Launcher', url: 'https://docs.base.org/l3' },
                  { name: 'Smart Wallet', url: 'https://docs.base.org/smart-wallet' },
                  { name: 'Verifications', url: 'https://docs.base.org/verifications' },
                ].map((product) => (
                  <Command.Item 
                    key={product.name}
                    className="px-3 py-2 mx-2 flex items-center justify-between rounded-md hover:bg-white/10 cursor-pointer"
                    onSelect={() => {
                      window.open(product.url, '_blank');
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white/90">{product.name}</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-white/40"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </Command.Item>
                ))}
              </Command.Group>

              {/* By solutions */}
              <div className="px-3 py-2 text-xs text-white/50">By solutions</div>
              <Command.Group
                className="mb-2">
                {[
                  { name: 'Finance', url: 'https://docs.base.dev/finance' },
                  { name: 'Social', url: 'https://docs.base.dev/social' },
                  { name: 'Commerce', url: 'https://docs.base.dev/commerce' },
                ].map((product) => (
                  <Command.Item 
                    key={product.name}
                    className="px-3 py-2 mx-2 flex items-center justify-between rounded-md hover:bg-white/10 cursor-pointer"
                    onSelect={() => {
                      window.open(product.url, '_blank');
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white/90">{product.name}</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-white/40"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </Command.Item>
                ))}
              </Command.Group>

              {/* Footer */}
              <div className="mt-4 px-3 py-3 border-t border-white/10 flex items-center justify-between text-sm text-white/40">
                <div>Base.dev</div>
                <div className="flex items-center gap-1">
                  <span>Docs</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10">D</kbd>
                </div>
              </div>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 