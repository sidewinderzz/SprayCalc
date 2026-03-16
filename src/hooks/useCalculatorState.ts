import { useState, useEffect, useRef } from 'react';
import { Product, MixData } from '../types';
import { calculateAmount } from '../utils/calculations';

export function useCalculatorState() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Product 1', rate: 0, unit: 'oz/acre', tankAmount: 0, outputFormat: 'auto' }
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

  // Tracks whether initial load has finished so auto-save doesn't fire too early
  const hasLoaded = useRef(false);

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

  // Auto-save all inputs to localStorage on every change
  useEffect(() => {
    if (!hasLoaded.current) return;
    try {
      localStorage.setItem('agSprayCalcSettings', JSON.stringify({
        fillVolume, applicationRate, products, fieldSize, implementWidth, speed, fillTime
      }));
    } catch (err) {
      console.error('Auto-save failed:', err);
    }
  }, [fillVolume, applicationRate, products, fieldSize, implementWidth, speed, fillTime]);

  // Load settings from localStorage (startup)
  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('agSprayCalcSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);

        if (settings.fillVolume) setFillVolume(settings.fillVolume);
        if (settings.tankSize && !settings.fillVolume) setFillVolume(settings.tankSize);
        if (settings.applicationRate) setApplicationRate(settings.applicationRate);
        if (settings.products) setProducts(settings.products);
        if (settings.fieldSize) setFieldSize(settings.fieldSize);
        if (settings.implementWidth) setImplementWidth(settings.implementWidth);
        if (settings.speed) setSpeed(settings.speed);
        if (settings.fillTime) setFillTime(settings.fillTime);

        setTimeout(() => {
          if (settings.products) {
            setProducts(currentProducts =>
              currentProducts.map(product => ({
                ...product,
                tankAmount: calculateAmount(
                  product.rate,
                  product.unit,
                  settings.fillVolume || settings.tankSize,
                  settings.applicationRate
                )
              }))
            );
          }
        }, 100);
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  // Clear current settings (reset inputs)
  const clearSettings = () => {
    try {
      hasLoaded.current = false;
      localStorage.removeItem('agSprayCalcSettings');
      setFillVolume(0);
      setApplicationRate(0);
      setProducts([{ id: 1, name: 'Product 1', rate: 0, unit: 'oz/acre', tankAmount: 0, outputFormat: 'auto' }]);
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
  const handleFillVolumeChange = (value: string) => {
    const newValue = parseFloat(value) || 0;
    setFillVolume(newValue);
    setProducts(currentProducts =>
      currentProducts.map(product => ({
        ...product,
        tankAmount: calculateAmount(product.rate, product.unit, newValue, applicationRate)
      }))
    );
  };

  // Set application rate with validation
  const handleApplicationRateChange = (value: string) => {
    const newValue = parseFloat(value) || 0;
    setApplicationRate(newValue);
    setProducts(currentProducts =>
      currentProducts.map(product => ({
        ...product,
        tankAmount: calculateAmount(product.rate, product.unit, fillVolume, newValue)
      }))
    );
  };

  // Handle acres per fill input change
  const handleAcresPerFillInputChange = (value: string) => {
    setAcresPerFillInput(value);
  };

  // Apply acres per fill change on blur
  const handleAcresPerFillBlur = () => {
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
  };

  // Handle product changes
  const handleProductChange = (id: number, field: string, value: string | number) => {
    setProducts(currentProducts =>
      currentProducts.map(product => {
        if (product.id === id) {
          const updatedProduct = {
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
          return updatedProduct;
        }
        return product;
      })
    );
  };

  // Toggle format menu for a product
  const toggleFormatMenu = (productId: number) => {
    if (openFormatMenuId === productId) {
      setOpenFormatMenuId(null);
    } else {
      setOpenFormatMenuId(productId);
    }
  };

  // Select a format for a product
  const selectFormat = (productId: number, format: string) => {
    handleProductChange(productId, 'outputFormat', format);
    setOpenFormatMenuId(null);
  };

  // Add a new product to the list
  const addNewProduct = () => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct: Product = {
      id: newId,
      name: `Product ${newId}`,
      rate: 0,
      unit: 'oz/acre',
      tankAmount: 0,
      outputFormat: 'auto'
    };
    setProducts([...products, newProduct]);
    setPendingFocusId(newId);
  };

  const clearPendingFocusId = () => setPendingFocusId(null);

  // Remove a product from the list
  const removeProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Load a mix into the calculator state (used by useMixStorage)
  const applyMixData = (mixData: MixData) => {
    try {
      if (mixData.fillVolume !== undefined) setFillVolume(mixData.fillVolume);
      if (mixData.applicationRate !== undefined) setApplicationRate(mixData.applicationRate);
      if (mixData.products) setProducts(mixData.products);
      if (mixData.fieldSize !== undefined) setFieldSize(mixData.fieldSize);
      if (mixData.implementWidth !== undefined) setImplementWidth(mixData.implementWidth);
      if (mixData.speed !== undefined) setSpeed(mixData.speed);
      if (mixData.fillTime !== undefined) setFillTime(mixData.fillTime);

      setTimeout(() => {
        if (mixData.products) {
          setProducts(current =>
            current.map(p => ({
              ...p,
              tankAmount: calculateAmount(p.rate, p.unit, mixData.fillVolume, mixData.applicationRate)
            }))
          );
        }
      }, 100);
    } catch (err) {
      console.error('Failed to apply mix data:', err);
    }
  };

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
