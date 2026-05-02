import { useState, useEffect, useRef, useCallback } from 'react';
import { Product, MixData } from '../types';
import { calculateAmount } from '../utils/calculations';

export function useCalculatorState() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Product 1', rate: 0, unit: 'oz/acre', tankAmount: 0, outputFormat: 'auto', jugSize: 128 }
  ]);
  const [fillVolume, setFillVolume] = useState(0);
  const [applicationRate, setApplicationRate] = useState(0);
  const [copyFeedback, setCopyFeedback] = useState('');

  // Field operations data
  const [fieldSize, setFieldSize] = useState(0);
  const [implementWidth, setImplementWidth] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [fillTime, setFillTime] = useState(0);

  // Format selection
  const [openFormatMenuId, setOpenFormatMenuId] = useState<number | null>(null);

  // Pending focus: ID of the product card that should receive focus after next render
  const [pendingFocusId, setPendingFocusId] = useState<number | null>(null);

  // Current time state for ETA calculation
  const [currentTime, setCurrentTime] = useState(new Date());

  // Feedback for saved settings
  const [settingsFeedback, setSettingsFeedback] = useState('');

  // Tips/Info module state
  const [showTips, setShowTips] = useState(false);

  // Acres per fill input state (allows free typing)
  const [acresPerFillInput, setAcresPerFillInput] = useState('');

  // Product Quantities section open/closed
  const [showQuantities, setShowQuantities] = useState(true);

  // Field Operations section open/closed
  const [showFieldOps, setShowFieldOps] = useState(true);

  // Tracks whether initial load has finished so auto-save doesn't fire too early
  const hasLoaded = useRef(false);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout>>();

  // Calculate acres per fill
  const acresPerFill = applicationRate > 0 ? fillVolume / applicationRate : 0;

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Sync acres per fill input when fillVolume or applicationRate changes externally
  useEffect(() => {
    if (applicationRate > 0 && fillVolume > 0) {
      setAcresPerFillInput((fillVolume / applicationRate).toFixed(2));
    } else {
      setAcresPerFillInput('');
    }
  }, [fillVolume, applicationRate]);

  // Auto-save all inputs to localStorage, debounced to avoid excessive writes
  useEffect(() => {
    if (!hasLoaded.current) return;
    clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem('agSprayCalcSettings', JSON.stringify({
          fillVolume, applicationRate, products, fieldSize, implementWidth, speed, fillTime
        }));
      } catch (err) {
        console.error('Auto-save failed:', err);
      }
    }, 500);
  }, [fillVolume, applicationRate, products, fieldSize, implementWidth, speed, fillTime]);

  // Load settings from localStorage (startup)
  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('agSprayCalcSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        const fv: number = settings.fillVolume || settings.tankSize || 0;
        const ar: number = settings.applicationRate || 0;

        if (fv) setFillVolume(fv);
        if (ar) setApplicationRate(ar);
        if (settings.products) {
          setProducts(settings.products.map((p: Product) => ({
            jugSize: 128,
            ...p,
            tankAmount: calculateAmount(p.rate, p.unit, fv, ar)
          })));
        }
        if (settings.fieldSize) setFieldSize(settings.fieldSize);
        if (settings.implementWidth) setImplementWidth(settings.implementWidth);
        if (settings.speed) setSpeed(settings.speed);
        if (settings.fillTime) setFillTime(settings.fillTime);
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
    hasLoaded.current = true;
  };

  // Clear current settings (reset inputs)
  const clearSettings = () => {
    try {
      hasLoaded.current = false;
      localStorage.removeItem('agSprayCalcSettings');
      setFillVolume(0);
      setApplicationRate(0);
      setProducts([{ id: 1, name: 'Product 1', rate: 0, unit: 'oz/acre', tankAmount: 0, outputFormat: 'auto', jugSize: 128 }]);
      setFieldSize(0);
      setImplementWidth(0);
      setSpeed(0);
      setFillTime(0);
      setSettingsFeedback('Calculator cleared!');
      setTimeout(() => {
        hasLoaded.current = true;
        setSettingsFeedback('');
      }, 300);
    } catch (err) {
      console.error('Failed to clear settings:', err);
      setSettingsFeedback('Error clearing');
      setTimeout(() => setSettingsFeedback(''), 2500);
    }
  };

  // Set fill volume with validation
  const handleFillVolumeChange = useCallback((value: string) => {
    const newValue = parseFloat(value) || 0;
    setFillVolume(newValue);
    setProducts(currentProducts =>
      currentProducts.map(product => ({
        ...product,
        tankAmount: calculateAmount(product.rate, product.unit, newValue, applicationRate)
      }))
    );
  }, [applicationRate]);

  // Set application rate with validation
  const handleApplicationRateChange = useCallback((value: string) => {
    const newValue = parseFloat(value) || 0;
    setApplicationRate(newValue);
    setProducts(currentProducts =>
      currentProducts.map(product => ({
        ...product,
        tankAmount: calculateAmount(product.rate, product.unit, fillVolume, newValue)
      }))
    );
  }, [fillVolume]);

  // Handle acres per fill input change
  const handleAcresPerFillInputChange = useCallback((value: string) => {
    setAcresPerFillInput(value);
  }, []);

  // Apply acres per fill change on blur
  const handleAcresPerFillBlur = useCallback(() => {
    const newAcresPerFill = parseFloat(acresPerFillInput) || 0;
    if (newAcresPerFill > 0 && fillVolume > 0) {
      const newApplicationRate = fillVolume / newAcresPerFill;
      setApplicationRate(newApplicationRate);
      setProducts(currentProducts =>
        currentProducts.map(product => ({
          ...product,
          tankAmount: calculateAmount(product.rate, product.unit, fillVolume, newApplicationRate)
        }))
      );
    }
  }, [acresPerFillInput, fillVolume]);

  // Handle product changes
  const handleProductChange = useCallback((id: number, field: string, value: string | number) => {
    setProducts(currentProducts =>
      currentProducts.map(product => {
        if (product.id === id) {
          return {
            ...product,
            [field]: value,
            tankAmount: (field === 'rate' || field === 'unit')
              ? calculateAmount(
                  field === 'rate' ? (value as number) : product.rate,
                  field === 'unit' ? (value as string) : product.unit,
                  fillVolume,
                  applicationRate
                )
              : product.tankAmount
          };
        }
        return product;
      })
    );
  }, [fillVolume, applicationRate]);

  // Toggle format menu for a product
  const toggleFormatMenu = useCallback((productId: number) => {
    setOpenFormatMenuId(prev => prev === productId ? null : productId);
  }, []);

  // Select a format for a product
  const selectFormat = useCallback((productId: number, format: string) => {
    setProducts(currentProducts =>
      currentProducts.map(product =>
        product.id === productId ? { ...product, outputFormat: format } : product
      )
    );
    setOpenFormatMenuId(null);
  }, []);

  // Add a new product to the list
  const addNewProduct = useCallback(() => {
    setProducts(currentProducts => {
      const newId = currentProducts.length > 0
        ? Math.max(...currentProducts.map(p => p.id)) + 1
        : 1;
      const newProduct: Product = {
        id: newId,
        name: `Product ${newId}`,
        rate: 0,
        unit: 'oz/acre',
        tankAmount: 0,
        outputFormat: 'auto',
        jugSize: 128
      };
      setPendingFocusId(newId);
      return [...currentProducts, newProduct];
    });
  }, []);

  const clearPendingFocusId = useCallback(() => setPendingFocusId(null), []);

  // Remove a product from the list
  const removeProduct = useCallback((id: number) => {
    setProducts(currentProducts => currentProducts.filter(product => product.id !== id));
  }, []);

  // Load a mix into the calculator state (used by useMixStorage)
  const applyMixData = useCallback((mixData: MixData) => {
    try {
      const fv = mixData.fillVolume ?? 0;
      const ar = mixData.applicationRate ?? 0;
      if (mixData.fillVolume !== undefined) setFillVolume(fv);
      if (mixData.applicationRate !== undefined) setApplicationRate(ar);
      if (mixData.products) {
        setProducts(mixData.products.map(p => ({
          jugSize: 128,
          ...p,
          tankAmount: calculateAmount(p.rate, p.unit, fv, ar)
        })));
      }
      if (mixData.fieldSize !== undefined) setFieldSize(mixData.fieldSize);
      if (mixData.implementWidth !== undefined) setImplementWidth(mixData.implementWidth);
      if (mixData.speed !== undefined) setSpeed(mixData.speed);
      if (mixData.fillTime !== undefined) setFillTime(mixData.fillTime);
    } catch (err) {
      console.error('Failed to apply mix data:', err);
    }
  }, []);

  return {
    // State
    products,
    fillVolume,
    applicationRate,
    copyFeedback,
    setCopyFeedback,
    fieldSize,
    setFieldSize,
    implementWidth,
    setImplementWidth,
    speed,
    setSpeed,
    fillTime,
    setFillTime,
    openFormatMenuId,
    currentTime,
    settingsFeedback,
    setSettingsFeedback,
    showTips,
    setShowTips,
    acresPerFillInput,
    showQuantities,
    setShowQuantities,
    showFieldOps,
    setShowFieldOps,
    acresPerFill,
    hasLoaded,
    pendingFocusId,
    clearPendingFocusId,
    // Handlers
    loadSettings,
    clearSettings,
    handleFillVolumeChange,
    handleApplicationRateChange,
    handleAcresPerFillInputChange,
    handleAcresPerFillBlur,
    handleProductChange,
    toggleFormatMenu,
    selectFormat,
    addNewProduct,
    removeProduct,
    applyMixData
  };
}
