import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, SlidersHorizontal, ArrowLeft, PackageSearch, Sparkles, 
  ChevronLeft, ChevronRight, Filter, RotateCcw, Check 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function CatalogPage({ products, onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(800);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const gridTopRef = useRef(null);

  // Extract max available price dynamically
  const maxAvailablePrice = useMemo(() => {
    if (!products.length) return 800;
    return Math.max(...products.map(p => p.price));
  }, [products]);

  // Extract unique badges / material tags across all products
  const availableBadges = useMemo(() => {
    const set = new Set();
    products.forEach(p => {
      p.badges?.forEach(b => set.add(b));
    });
    return Array.from(set);
  }, [products]);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts = { all: products.length };
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Toggle badge filter
  const toggleBadge = (badge) => {
    setSelectedBadges(prev => 
      prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setMaxPrice(Math.ceil(maxAvailablePrice));
    setSelectedBadges([]);
    setSortBy('default');
    setCurrentPage(1);
  };

  // Count total active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm.trim()) count++;
    if (selectedCategory !== 'all') count++;
    if (maxPrice < Math.ceil(maxAvailablePrice)) count++;
    if (selectedBadges.length > 0) count += selectedBadges.length;
    return count;
  }, [searchTerm, selectedCategory, maxPrice, maxAvailablePrice, selectedBadges]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category check
        const matchesCategory =
          selectedCategory === 'all' || product.category === selectedCategory;

        // Price check
        const matchesPrice = product.price <= maxPrice;

        // Badge / Material check
        const matchesBadges =
          selectedBadges.length === 0 ||
          selectedBadges.every(badge => product.badges?.includes(badge));

        // Search text check
        const term = searchTerm.toLowerCase().trim();
        let matchesSearch = true;
        if (term) {
          const matchesName = product.name.toLowerCase().includes(term);
          const matchesDesc = product.description.toLowerCase().includes(term);
          const matchesCat = product.category.toLowerCase().includes(term);
          const matchesTags = product.badges?.some(b => b.toLowerCase().includes(term));
          matchesSearch = matchesName || matchesDesc || matchesCat || matchesTags;
        }

        return matchesCategory && matchesPrice && matchesBadges && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0; // default order
      });
  }, [products, searchTerm, selectedCategory, maxPrice, selectedBadges, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, maxPrice, selectedBadges, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'all': return 'Todas as Categorias';
      case 'panelas': return 'Panelas & Caçarolas';
      case 'talheres': return 'Talheres & Facas';
      case 'acessorios': return 'Acessórios Gourmet';
      default: return cat.charAt(0).toUpperCase() + cat.slice(1);
    }
  };

  // Shared Filter Controls Panel
  const FilterControls = () => (
    <div className="space-y-6">
      {/* Active Filters Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-graphite/10">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-terracotta" />
          <h3 className="font-bold text-sm text-graphite uppercase tracking-wider">Filtros</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-gradient-rp text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center space-x-1 text-xs text-graphite/60 hover:text-terracotta transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Limpar</span>
          </button>
        )}
      </div>

      {/* 1. Categorias */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-graphite/70 block">
          Categorias
        </label>
        <div className="space-y-1.5">
          {['all', 'panelas', 'talheres', 'acessorios'].map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-graphite text-white font-bold shadow-sm'
                    : 'text-graphite/80 hover:bg-graphite/5'
                }`}
              >
                <span>{getCategoryLabel(cat)}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-graphite/10 text-graphite/70'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Faixa de Preço */}
      <div className="space-y-3 pt-4 border-t border-graphite/10">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold uppercase tracking-wider text-graphite/70">Preço Máximo</label>
          <span className="font-bold text-terracotta">R$ {maxPrice.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="100"
          max={Math.ceil(maxAvailablePrice)}
          step="20"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-terracotta cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-graphite/50 font-medium">
          <span>R$ 100,00</span>
          <span>R$ {Math.ceil(maxAvailablePrice).toFixed(2)}</span>
        </div>
      </div>

      {/* 3. Materiais & Destaques */}
      <div className="space-y-3 pt-4 border-t border-graphite/10">
        <label className="text-xs font-bold uppercase tracking-wider text-graphite/70 block">
          Material & Atributos
        </label>
        <div className="flex flex-wrap gap-1.5">
          {availableBadges.map((badge) => {
            const isSelected = selectedBadges.includes(badge);
            return (
              <button
                key={badge}
                onClick={() => toggleBadge(badge)}
                className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                  isSelected
                    ? 'bg-gradient-rp text-white shadow-sm'
                    : 'bg-offwhite-dark text-graphite/70 hover:bg-graphite/10'
                }`}
              >
                {isSelected && <Check className="w-3 h-3" />}
                <span>{badge}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-offwhite pt-28 pb-20 px-6 md:px-12 text-graphite">
      <div className="max-w-7xl mx-auto space-y-8" ref={gridTopRef}>
        
        {/* Header Breadcrumb & Title */}
        <div className="space-y-3">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-graphite/60 hover:text-terracotta transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para a Início</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-terracotta text-xs font-semibold tracking-widest uppercase mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Coleção RP Utilidades Gourmet</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-graphite tracking-tight">
                Catálogo de Produtos
              </h1>
              <p className="text-graphite/70 text-sm md:text-base font-light mt-1 max-w-2xl">
                Navegue pela nossa linha completa de utensílios artesanais com opções de busca e filtros refinados.
              </p>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center justify-center space-x-2 bg-graphite text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md active:scale-95"
            >
              <Filter className="w-4 h-4 text-terracotta-light" />
              <span>Filtros e Pesquisa</span>
              {activeFiltersCount > 0 && (
                <span className="bg-terracotta text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search & Top Action Controls Bar */}
        <div className="bg-white border border-graphite/10 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Main Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, panela, faca, inox..."
              className="w-full bg-offwhite pl-11 pr-9 py-3 rounded-xl border border-graphite/10 text-xs md:text-sm text-graphite placeholder:text-graphite/40 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                aria-label="Limpar busca"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-graphite/40 hover:text-graphite transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Sort + Items Per Page */}
          <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
            {/* Sort Selector */}
            <div className="flex items-center space-x-2 bg-offwhite border border-graphite/10 rounded-xl px-3 py-2">
              <SlidersHorizontal className="w-4 h-4 text-graphite/60" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold text-graphite focus:outline-none cursor-pointer"
              >
                <option value="default">Relevância / Destaque</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="name-asc">Nome (A - Z)</option>
              </select>
            </div>

            {/* Items Per Page */}
            <div className="flex items-center space-x-2 bg-offwhite border border-graphite/10 rounded-xl px-3 py-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-graphite/60">Exibir:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-transparent text-xs font-semibold text-graphite focus:outline-none cursor-pointer"
              >
                <option value={6}>6 p/ pág</option>
                <option value={8}>8 p/ pág</option>
                <option value={12}>12 p/ pág</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold uppercase tracking-wider text-graphite/60 mr-1">Filtros Ativos:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-graphite text-white rounded-full text-xs font-medium">
                <span>{getCategoryLabel(selectedCategory)}</span>
                <button onClick={() => setSelectedCategory('all')}><X className="w-3 h-3 ml-1" /></button>
              </span>
            )}
            {maxPrice < Math.ceil(maxAvailablePrice) && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-graphite text-white rounded-full text-xs font-medium">
                <span>Até R$ {maxPrice.toFixed(2)}</span>
                <button onClick={() => setMaxPrice(Math.ceil(maxAvailablePrice))}><X className="w-3 h-3 ml-1" /></button>
              </span>
            )}
            {selectedBadges.map(badge => (
              <span key={badge} className="inline-flex items-center space-x-1 px-3 py-1 bg-gradient-rp text-white rounded-full text-xs font-medium">
                <span>{badge}</span>
                <button onClick={() => toggleBadge(badge)}><X className="w-3 h-3 ml-1" /></button>
              </span>
            ))}
            {searchTerm && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-graphite text-white rounded-full text-xs font-medium">
                <span>"{searchTerm}"</span>
                <button onClick={() => setSearchTerm('')}><X className="w-3 h-3 ml-1" /></button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs text-terracotta font-semibold underline hover:text-terracotta-dark ml-2"
            >
              Limpar Todos
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar + Product Grid */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Desktop Filter Sidebar (280px sticky column) */}
          <aside className="hidden md:block w-72 flex-none sticky top-28 bg-white border border-graphite/10 rounded-2xl p-6 shadow-sm">
            <FilterControls />
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1 w-full space-y-8">
            
            {/* Counter info */}
            <div className="flex items-center justify-between text-xs text-graphite/60 font-medium">
              <span>
                Exibindo <span className="font-bold text-graphite">{filteredProducts.length === 0 ? 0 : startIndex + 1}</span>–<span className="font-bold text-graphite">{Math.min(startIndex + itemsPerPage, filteredProducts.length)}</span> de <span className="font-bold text-graphite">{filteredProducts.length}</span> produtos
              </span>
              <span>Página {currentPage} de {totalPages}</span>
            </div>

            {/* Products Grid */}
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div
                  key={`grid-page-${currentPage}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white border border-graphite/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4"
                >
                  <div className="p-4 bg-terracotta/10 rounded-full text-terracotta">
                    <PackageSearch className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-graphite">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-graphite/60 text-xs md:text-sm max-w-md">
                    Não encontramos produtos que correspondam aos filtros selecionados. Tente ajustar o preço, categorias ou termo de pesquisa.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-2 px-6 py-2.5 bg-gradient-rp text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-md"
                  >
                    Limpar Filtros e Pesquisa
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Professional Pagination Bar */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between border-t border-graphite/10 pt-6 gap-4">
                <span className="text-xs text-graphite/60 font-medium">
                  Página <span className="font-bold text-graphite">{currentPage}</span> de <span className="font-bold text-graphite">{totalPages}</span>
                </span>

                <div className="flex items-center space-x-2">
                  {/* Previous Page Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                      currentPage === 1
                        ? 'border-graphite/10 text-graphite/30 cursor-not-allowed'
                        : 'border-graphite/20 text-graphite hover:bg-graphite hover:text-white shadow-sm'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                          currentPage === page
                            ? 'bg-gradient-rp text-white shadow-md scale-105'
                            : 'bg-white border border-graphite/10 text-graphite/70 hover:bg-graphite/5'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Page Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                      currentPage === totalPages
                        ? 'border-graphite/10 text-graphite/30 cursor-not-allowed'
                        : 'border-graphite/20 text-graphite hover:bg-graphite hover:text-white shadow-sm'
                    }`}
                  >
                    <span>Próximo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Mobile Filters Modal / Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 z-50 bg-black md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 z-50 bg-white p-6 overflow-y-auto md:hidden shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-graphite/10">
                  <h2 className="font-bold text-lg text-graphite">Filtros do Catálogo</h2>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 text-graphite/60 hover:text-graphite"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <FilterControls />
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full mt-6 py-3 bg-gradient-rp text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md"
              >
                Aplicar Filtros ({filteredProducts.length} Produtos)
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
