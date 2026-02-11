'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchInputProps {
  initialSearch?: string;
}

export default function SearchInput({ initialSearch = '' }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [isLoading, setIsLoading] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Sincronizar o estado local quando os searchParams mudarem (navegação de página)
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    if (currentSearch !== searchTerm) {
      setSearchTerm(currentSearch);
    }
  }, [searchParams]);

  // Busca automática com debounce (sem precisar Enter)
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';

    // Só fazer busca se o termo local for diferente do que está na URL
    if (searchTerm === currentSearch) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (searchTerm.length >= 3) {
      setIsLoading(true);
      timeoutRef.current = setTimeout(() => {
        performSearch(searchTerm, true); // resetPage = true para nova busca
        setIsLoading(false);
      }, 500); // 500ms de debounce
    } else if (searchTerm.length === 0 && currentSearch !== '') {
      // Se campo estiver vazio e havia busca anterior, limpar busca
      performSearch('', true);
      setIsLoading(false);
    } else {
      // Entre 1-2 caracteres, não faz busca
      setIsLoading(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm, searchParams]);

  // Fechar sugestões ao clicar fora - REMOVIDO (não há mais dropdown)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Busca já é feita automaticamente pelo debounce, mas permite override manual
    if (searchTerm.length >= 3) {
      performSearch(searchTerm, true); // resetPage = true para submit manual
    }
  };

  const performSearch = (term: string, resetPage: boolean = true) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term.trim()) {
      params.set('search', term.trim());
    } else {
      params.delete('search');
    }

    // Só resetar para página 1 se for uma nova busca (não navegação de página)
    if (resetPage) {
      params.set('page', '1');
    }

    router.push(`/admin/pacientes?${params.toString()}`);
  };

  return (
    <div className="relative mt-4">
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <Search className="absolute z-10 ml-2 text-gray-400" size={20} />
          {isLoading && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-gray-500"></div>
            </div>
          )}
          <Input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Buscar paciente... (mín. 3 caracteres)"
            className="w-full pr-12 pl-10 md:w-1/3"
            autoComplete="off"
          />

          {/* Botão de submit invisível para permitir enter */}
          <button type="submit" className="sr-only">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}
