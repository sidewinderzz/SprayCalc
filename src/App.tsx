import React, { useState, useEffect } from 'react';

const AgSprayCalculator = () => {
  const [products, setProducts] = useState([
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
  const [openFormatMenuId, setOpenFormatMenuId] = useState(null);
  
  // Current time state for ETA calculation
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Feedback for saved settings
  const [settingsFeedback, setSettingsFeedback] = useState('');
  
  // Tips/Info module state
  const [showTips, setShowTips] = useState(false);
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Load saved settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Custom color theme
  const colors = {
    primary: '#498a5a',
    secondary: '#d1c343',
    primaryLight: '#76a886',
    primaryDark: '#2d6840',
    secondaryLight: '#e4d97b',
    secondaryDark: '#b2a529',
    lightText: '#1c291f'
  };

  // Available output formats
  const outputFormats = [
    {value: 'auto', label: 'Auto (Default)'},
    {value: 'floz', label: 'Fluid Ounces Only'},
    {value: 'gal', label: 'Gallons (Decimal)'},
    {value: 'gal_oz', label: 'Gallons & Ounces'},
    {value: 'qt', label: 'Quarts'},
    {value: 'pt', label: 'Pints'},
    {value: 'cups', label: 'Cups'}
  ];

  // Calculate acres per fill
  const acresPerFill = applicationRate > 0 ? fillVolume / applicationRate : 0;

  // Calculate suggested fill volume based on field size
  const calculateSuggestedFillVolume = () => {
    if (!fieldSize || !applicationRate) return null;
    
    const totalSprayNeeded = fieldSize * applicationRate;
    
    // Suggest common practical fill volumes
    const commonVolumes = [10, 25, 50, 100, 200, 300, 500, 1000];
    
    // If total spray needed is small, suggest exact amount rounded up to nearest 5
    if (totalSprayNeeded <= 50) {
      return Math.ceil(totalSprayNeeded / 5) * 5;
    }
    
    // For larger fields, suggest a fill volume that divides nicely
    // Find the largest common volume that goes into total spray evenly (or close to it)
    for (let volume of commonVolumes.reverse()) {
      const mixes = totalSprayNeeded / volume;
      if (mixes >= 2 && mixes <= 10) { // Between 2-10 mixes is reasonable
        return volume;
      }
    }
    
    // Default to a practical size based on field size
    if (totalSprayNeeded <= 100) return 50;
    if (totalSprayNeeded <= 500) return 100;
    if (totalSprayNeeded <= 1000) return 200;
    return 500;
  };

  // Calculate mix planning for the field
  const calculateMixPlanning = () => {
    if (!fieldSize || !applicationRate || !fillVolume) return null;
    
    const totalSprayNeeded = fieldSize * applicationRate;
    const fullMixes = Math.floor(totalSprayNeeded / fillVolume);
    const remainingSpray = totalSprayNeeded - (fullMixes * fillVolume);
    const remainingAcres = remainingSpray / applicationRate;
    
    return {
      totalSprayNeeded,
      fullMixes,
      remainingSpray,
      remainingAcres,
      hasPartialMix: remainingSpray > 0
    };
  };

  // Convert any rate to oz based on unit type
  const convertToOz = (rate, unit) => {
    if (unit.startsWith('oz')) return rate;
    if (unit.startsWith('pt')) return rate * 16;
    if (unit.startsWith('qt')) return rate * 32;
    if (unit.startsWith('gal')) return rate * 128;
    if (unit.startsWith('lb')) return rate * 16;
    if (unit.startsWith('g')) return rate * 0.033814;
    return rate;
  };

  // Calculate amount for a single product
  const calculateAmount = (rate, unit, currentFillVolume = fillVolume, currentAppRate = applicationRate) => {
    if (!rate || rate === 0) return 0;
    
    let amount = 0;
    const currentAcresPerFill = currentAppRate > 0 ? currentFillVolume / currentAppRate : 0;
    
    if (unit.includes('per') && unit.includes('gal')) {
      const gallonsMatch = unit.match(/per (\d+) gal/);
      if (gallonsMatch && gallonsMatch[1]) {
        const gallonsReferenced = parseInt(gallonsMatch[1]);
        const rateInOz = convertToOz(rate, unit);
        amount = (rateInOz * currentFillVolume) / gallonsReferenced;
      }
    } 
    else if (unit.includes('/acre')) {
      const rateInOz = convertToOz(rate, unit);
      amount = rateInOz * currentAcresPerFill;
    }
    
    return amount;
  };

  // Calculate total product needed for entire field
  const calculateFieldAmount = (rate, unit, totalAcres) => {
    if (!rate || rate === 0 || !totalAcres) return 0;
    
    let amount = 0;
    
    if (unit.includes('per') && unit.includes('gal')) {
      // For concentration units, calculate based on total spray volume
      const totalSprayVolume = totalAcres * applicationRate;
      const gallonsMatch = unit.match(/per (\d+) gal/);
      if (gallonsMatch && gallonsMatch[1]) {
        const gallonsReferenced = parseInt(gallonsMatch[1]);
        const rateInOz = convertToOz(rate, unit);
        amount = (rateInOz * totalSprayVolume) / gallonsReferenced;
      }
    } 
    else if (unit.includes('/acre')) {
      const rateInOz = convertToOz(rate, unit);
      amount = rateInOz * totalAcres;
    }
    
    return amount;
  };

  // Format the output amount in appropriate units
  const formatOutput = (value, format) => {
    if (value === 0) return '0 fl oz';
    
    switch(format) {
      case 'floz':
        return `${value.toFixed(1)} fl oz`;
        
      case 'gal':
        const gallonsOnly = (value / 128).toFixed(2);
        return `${gallonsOnly} gal`;
        
      case 'gal_oz':
        const gallons = Math.floor(value / 128);
        const ozRemaining = (value % 128).toFixed(1);
        if (parseFloat(ozRemaining) === 0) {
          return `${gallons} gal`;
        } else {
          return `${gallons} gal ${ozRemaining} fl oz`;
        }
        
      case 'qt':
        const quarts = (value / 32).toFixed(2);
        return `${quarts} qt`;
        
      case 'pt':
        const pints = (value / 16).toFixed(2);
        return `${pints} pt`;
        
      case 'cups':
        const cups = (value / 8).toFixed(2);
        return `${cups} cups`;
        
      case 'auto':
      default:
        if (value < 256) {
          return `${value.toFixed(1)} fl oz`;
        } 
        else {
          const gallonsAuto = Math.floor(value / 128);
          const ozRemainingAuto = (value % 128).toFixed(1);
          
          const totalGallons = value / 128;
          const is25GallonMultiple = Math.abs(totalGallons / 2.5 - Math.round(totalGallons / 2.5)) < 0.01;
          
          let result = '';
          
          if (parseFloat(ozRemainingAuto) === 0) {
            result = `${gallonsAuto} gal`;
          } else {
            result = `${gallonsAuto} gal ${ozRemainingAuto} fl oz`;
          }
          
          if (is25GallonMultiple) {
            const jugs = Math.round(totalGallons / 2.5);
            result += ` (${jugs} × 2.5 gal jugs)`;
          }
          
          return result;
        }
    }
  };

  // Format product amounts for purchase planning
  const formatPurchaseAmount = (totalOunces) => {
    if (totalOunces === 0) return { display: '0 fl oz', containers: [] };

    const totalGallons = totalOunces / 128;
    
    // Common container sizes (in gallons)
    const containerSizes = [
      { size: 2.5, name: '2.5 gal jug' },
      { size: 1, name: '1 gal jug' },
      { size: 0.5, name: '0.5 gal (64 fl oz)' },
      { size: 0.25, name: '1 qt (32 fl oz)' },
      { size: 0.125, name: '1 pt (16 fl oz)' }
    ];

    // Find best container combination
    let suggestions = [];
    
    for (let container of containerSizes) {
      const containerCount = Math.ceil(totalGallons / container.size);
      const totalContainerVolume = containerCount * container.size * 128; // Convert to fl oz
      const wasteOz = totalContainerVolume - totalOunces;
      const wastePercent = (wasteOz / totalContainerVolume) * 100;
      
      suggestions.push({
        count: containerCount,
        size: container.name,
        totalVolume: totalContainerVolume,
        waste: wasteOz,
        wastePercent: wastePercent,
        display: `${containerCount} × ${container.name}`
      });
    }

    // Sort by waste percentage (prefer less waste)
    suggestions.sort((a, b) => a.wastePercent - b.wastePercent);

    return {
      display: formatOutput(totalOunces, 'auto'),
      containers: suggestions.slice(0, 3) // Show top 3 options
    };
  };

  // Save settings to localStorage
  const saveSettings = () => {
    try {
      const settings = {
        fillVolume,
        applicationRate,
        products,
        fieldSize,
        implementWidth,
        speed,
        fillTime
      };
      
      localStorage.setItem('agSprayCalcSettings', JSON.stringify(settings));
      setSettingsFeedback('Settings saved!');
      setTimeout(() => setSettingsFeedback(''), 2000);
    } catch (err) {
      setSettingsFeedback('Error saving settings');
      console.error('Failed to save settings:', err);
      setTimeout(() => setSettingsFeedback(''), 2000);
    }
  };
  
  // Load settings from localStorage
  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('agSprayCalcSettings');
      
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        if (settings.fillVolume) setFillVolume(settings.fillVolume);
        // Legacy support for old tankSize
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
  
  // Clear all saved settings
  const clearSettings = () => {
    try {
      localStorage.removeItem('agSprayCalcSettings');
      setSettingsFeedback('Settings cleared!');
      setTimeout(() => setSettingsFeedback(''), 2000);
    } catch (err) {
      setSettingsFeedback('Error clearing settings');
      console.error('Failed to clear settings:', err);
      setTimeout(() => setSettingsFeedback(''), 2000);
    }
  };

  // Generate summary text for clipboard
  const generateSummaryText = () => {
    let text = `AG SPRAY MIX CALCULATOR SUMMARY\n`;
    text += `=============================\n\n`;
    text += `MIX INFORMATION:\n`;
    text += `Fill Volume: ${fillVolume} gallons\n`;
    if (tankCapacity) text += `Tank Capacity: ${tankCapacity} gallons\n`;
    text += `Application Rate: ${applicationRate} GPA\n`;
    text += `Acres Per Fill: ${acresPerFill.toFixed(2)}\n\n`;
    
    text += `PRODUCTS TO ADD PER MIX:\n`;
    products.forEach(product => {
      text += `${product.name}: ${formatOutput(product.tankAmount, product.outputFormat)}\n`;
    });

    if (fieldSize) {
      const mixPlanning = calculateMixPlanning();
      if (mixPlanning) {
        text += `\nFIELD MIX PLANNING:\n`;
        text += `Field Size: ${fieldSize} acres\n`;
        text += `Total Spray Volume: ${mixPlanning.totalSprayNeeded.toFixed(0)} gallons\n`;
        text += `Full Mixes Needed: ${mixPlanning.fullMixes}\n`;
        
        if (mixPlanning.hasPartialMix) {
          text += `Partial Mix: ${mixPlanning.remainingSpray.toFixed(1)} gallons for ${mixPlanning.remainingAcres.toFixed(2)} acres\n`;
          text += `\nPRODUCTS FOR PARTIAL MIX:\n`;
          products.forEach(product => {
            const partialAmount = calculateAmount(product.rate, product.unit, mixPlanning.remainingSpray, applicationRate);
            text += `${product.name}: ${formatOutput(partialAmount, product.outputFormat)}\n`;
          });
        }
      }
      
      text += `\nTOTAL PRODUCT QUANTITIES REQUIRED:\n`;
      products.forEach(product => {
        const totalAmount = calculateFieldAmount(product.rate, product.unit, fieldSize);
        const purchaseInfo = formatPurchaseAmount(totalAmount);
        text += `${product.name}: ${purchaseInfo.display}\n`;
        if (purchaseInfo.containers.length > 0) {
          text += `  Suggested: ${purchaseInfo.containers[0].display}\n`;
        }
      });
    }
    
    if (fieldSize && implementWidth && speed) {
      text += `\nFIELD OPERATIONS:\n`;
      text += `Implement Width: ${implementWidth} ft\n`;
      text += `Speed: ${speed} mph\n`;
      text += `Fill Time: ${fillTime} minutes\n\n`;
      
      const acresPerHour = speed * implementWidth * 0.1212;
      const tanksNeeded = fieldSize / acresPerFill;
      const sprayHours = fieldSize / acresPerHour;
      const totalFillTimeHours = (fillTime / 60) * tanksNeeded;
      const totalJobHours = sprayHours + totalFillTimeHours;
      const effectiveAcresPerHour = fieldSize / totalJobHours;
      
      const completionTime = new Date(currentTime.getTime() + totalJobHours * 60 * 60 * 1000);
      
      const formatTime = (hours) => {
        const wholeHours = Math.floor(hours);
        const minutes = Math.round((hours - wholeHours) * 60);
        return `${wholeHours} hr ${minutes} min`;
      };
      
      const formatETAText = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        let dayPrefix = '';
        
        if (date.getDate() === today.getDate() && 
            date.getMonth() === today.getMonth() && 
            date.getFullYear() === today.getFullYear()) {
          dayPrefix = 'Today at ';
        } else if (date.getDate() === tomorrow.getDate() && 
                  date.getMonth() === tomorrow.getMonth() && 
                  date.getFullYear() === tomorrow.getFullYear()) {
          dayPrefix = 'Tomorrow at ';
        } else {
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          dayPrefix = `${days[date.getDay()]} at `;
        }
        
        return `${dayPrefix}${formattedHours}:${formattedMinutes} ${ampm}`;
      };
      
      text += `Working Rate: ${acresPerHour.toFixed(1)} acres/hour\n`;
      text += `Effective Rate (with filling): ${effectiveAcresPerHour.toFixed(1)} acres/hour\n`;
      text += `Mixes Needed: ${Math.ceil(tanksNeeded)} (${tanksNeeded.toFixed(1)})\n`;
      text += `Spray Time: ${formatTime(sprayHours)}\n`;
      text += `Total Fill Time: ${formatTime(totalFillTimeHours)}\n`;
      text += `Estimated Job Completion: ${formatTime(totalJobHours)}\n`;
      text += `Estimated Finish Time: ${formatETAText(completionTime)}\n`;
    }
    
    return text;
  };
  
  // Copy summary to clipboard
  const copyToClipboard = async () => {
    const text = generateSummaryText();
    
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback('Copied to clipboard!');
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopyFeedback('Copied to clipboard!');
      console.error('Used fallback copy method due to:', err);
    }
    
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  // Set fill volume with validation
  const handleFillVolumeChange = (value) => {
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
  const handleApplicationRateChange = (value) => {
    const newValue = parseFloat(value) || 0;
    setApplicationRate(newValue);
    setProducts(currentProducts => 
      currentProducts.map(product => ({
        ...product,
        tankAmount: calculateAmount(product.rate, product.unit, fillVolume, newValue)
      }))
    );
  };

  // Handle product changes 
  const handleProductChange = (id, field, value) => {
    setProducts(currentProducts =>
      currentProducts.map(product => {
        if (product.id === id) {
          const updatedProduct = { 
            ...product, 
            [field]: value,
            tankAmount: (field === 'rate' || field === 'unit') 
              ? calculateAmount(
                  field === 'rate' ? value : product.rate,
                  field === 'unit' ? value : product.unit,
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
  const toggleFormatMenu = (productId) => {
    if (openFormatMenuId === productId) {
      setOpenFormatMenuId(null);
    } else {
      setOpenFormatMenuId(productId);
    }
  };

  // Select a format for a product
  const selectFormat = (productId, format) => {
    handleProductChange(productId, 'outputFormat', format);
    setOpenFormatMenuId(null);
  };

  // Add a new product to the list
  const addNewProduct = () => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { 
      id: newId, 
      name: `Product ${newId}`, 
      rate: 0, 
      unit: 'oz/acre',
      tankAmount: 0,
      outputFormat: 'auto'
    };
    setProducts([...products, newProduct]);
  };

  // Remove a product from the list
  const removeProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Calculate field operations estimates
  const calculateFieldOperations = () => {
    if (!fillVolume || !applicationRate) {
      return (
        <div className="p-3 rounded" style={{backgroundColor: colors.secondaryLight + '30'}}>
          <p><strong>Important:</strong> Please enter your fill volume and application rate in the Mix Information section above.</p>
        </div>
      );
    }
    
    if (!speed || !implementWidth || !fieldSize || !acresPerFill) {
      return (
        <div className="p-3 rounded" style={{backgroundColor: colors.secondaryLight + '30'}}>
          <p>Please fill in all field operation values above to see estimates.</p>
          <p className="text-sm mt-2">These calculations will show:</p>
          <ul className="list-disc pl-6 text-sm mt-1">
            <li>Working rate (acres/hour)</li>
            <li>Effective rate with filling time</li>
            <li>Number of mixes needed</li>
            <li>Total gallons required</li>
            <li>Estimated spray and fill times</li>
            <li>Estimated completion time (ETA)</li>
          </ul>
        </div>
      );
    }
    
    const acresPerHour = speed * implementWidth * 0.1212;
    const mixesNeeded = fieldSize / acresPerFill;
    const sprayHours = fieldSize / acresPerHour;
    const totalFillTimeHours = (fillTime / 60) * mixesNeeded;
    const totalJobHours = sprayHours + totalFillTimeHours;
    const effectiveAcresPerHour = fieldSize / totalJobHours;
    const totalGallons = fieldSize * applicationRate;
    
    const completionTime = new Date(currentTime.getTime() + totalJobHours * 60 * 60 * 1000);
    
    const formatTime = (hours) => {
      const wholeHours = Math.floor(hours);
      const minutes = Math.round((hours - wholeHours) * 60);
      return `${wholeHours} hr ${minutes} min`;
    };
    
    const formatETA = (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      let dayPrefix = '';
      
      if (date.getDate() === today.getDate() && 
          date.getMonth() === today.getMonth() && 
          date.getFullYear() === today.getFullYear()) {
        dayPrefix = 'Today at ';
      } else if (date.getDate() === tomorrow.getDate() && 
                date.getMonth() === tomorrow.getMonth() && 
                date.getFullYear() === tomorrow.getFullYear()) {
        dayPrefix = 'Tomorrow at ';
      } else {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        dayPrefix = `${days[date.getDay()]} at `;
      }
      
      return `${dayPrefix}${formattedHours}:${formattedMinutes} ${ampm}`;
    };
    
    return (
      <div className="grid grid-cols-1 gap-2">
        <p>• Working rate: <strong>{acresPerHour.toFixed(1)} acres/hour</strong></p>
        <p>• Effective rate (with filling): <strong>{effectiveAcresPerHour.toFixed(1)} acres/hour</strong></p>
        <p>• Mixes needed: <strong>{Math.ceil(mixesNeeded)} mixes</strong> ({mixesNeeded.toFixed(1)})</p>
        <p>• Total gallons: <strong>{totalGallons.toFixed(0)} gallons</strong></p>
        <p>• Spray time: <strong>{formatTime(sprayHours)}</strong></p>
        <p>• Total fill time: <strong>{formatTime(totalFillTimeHours)}</strong></p>
        <p>• Estimated job completion time: <strong>{formatTime(totalJobHours)}</strong></p>
        <p>• Estimated completion: <strong>{formatETA(completionTime)}</strong></p>
      </div>
    );
  };

  const unitOptions = [
    'oz/acre', 
    'pt/acre', 
    'qt/acre', 
    'gal/acre', 
    'lb/acre', 
    'g/acre',
    'oz per 100 gal',
    'pt per 100 gal',
    'qt per 100 gal',
    'lb per 100 gal'
  ];

  return (
    <div className="p-4 bg-gray-50">
      <div 
        className="rounded-lg mx-auto p-4 sm:p-6 shadow-md"
        style={{
          backgroundColor: 'white',
          color: colors.lightText,
          maxWidth: "min(100%, 1000px)"
        }}
      >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{color: colors.primary}}>Ag Spray Mixing Calculator</h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowTips(!showTips)}
            className="px-3 py-1 rounded-lg text-sm"
            style={{
              backgroundColor: showTips ? colors.secondary : 'transparent',
              color: showTips ? 'white' : colors.primary,
              border: `1px solid ${colors.primary}`
            }}
            title="Show app tips and functionality guide"
          >
            Tips
          </button>
          <button 
            onClick={saveSettings}
            className="px-3 py-1 rounded-lg text-sm"
            style={{
              backgroundColor: colors.primary,
              color: 'white'
            }}
            title="Save your current calculator settings"
          >
            Save Settings
          </button>
          <button 
            onClick={clearSettings}
            className="px-3 py-1 rounded-lg text-sm"
            style={{
              backgroundColor: 'transparent',
              color: colors.primaryDark,
              border: `1px solid ${colors.primary}`
            }}
            title="Clear saved settings"
          >
            Clear
          </button>
          {settingsFeedback && (
            <div className="px-2 py-1 text-sm rounded" style={{backgroundColor: colors.secondaryLight}}>
              {settingsFeedback}
            </div>
          )}
        </div>
      </div>

      {/* Tips/Info Module */}
      {showTips && (
        <div 
          className="p-4 rounded-lg mb-6 border-2"
          style={{
            backgroundColor: colors.secondary + '10',
            borderColor: colors.secondary
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold" style={{color: colors.primaryDark}}>
              How to Use This Calculator
            </h2>
            <button 
              onClick={() => setShowTips(false)}
              className="text-lg px-2 py-1 rounded hover:bg-gray-200"
              title="Close tips"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Getting Started */}
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2" style={{color: colors.primary}}>Getting Started</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>1. Set your mix info:</strong> Enter your fill volume (how much spray you're making) and application rate (GPA)</p>
                  <p><strong>2. Add products:</strong> Click "+ Add Product" and enter each chemical's rate and unit</p>
                  <p><strong>3. Enter field size:</strong> Add your field acreage to get purchase planning and mix breakdowns</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2" style={{color: colors.primary}}>Smart Features</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>• Smart suggestions:</strong> Get fill volume recommendations based on your field size</p>
                  <p><strong>• Mix planning:</strong> See exactly how many full mixes + partial mixes you need</p>
                  <p><strong>• Purchase optimization:</strong> Get container suggestions to minimize waste</p>
                  <p><strong>• Field timing:</strong> Calculate spray time and completion estimates</p>
                </div>
              </div>
            </div>
            
            {/* Features & Tips */}
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2" style={{color: colors.primary}}>Key Features</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Product Quantities:</strong> Shows total products to buy AND exact amounts for each mix</p>
                  <p><strong>Partial mixes:</strong> Calculates reduced chemical amounts for remaining acres</p>
                  <p><strong>Multiple formats:</strong> Click any amount to change display units (oz, gal, qt, etc.)</p>
                  <p><strong>Field operations:</strong> Enter implement width, speed, and fill time for job estimates</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2" style={{color: colors.primary}}>Pro Tips</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>• Save settings:</strong> Your data is automatically saved when you click "Save Settings"</p>
                  <p><strong>• Copy summary:</strong> Click the clipboard icon to copy all info to share or print</p>
                  <p><strong>• Fill volume strategy:</strong> For small fields, use exact spray amount. For large fields, use consistent fill volumes</p>
                  <p><strong>• Rate units:</strong> Use "/acre" for per-acre rates or "per X gal" for concentration rates</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Examples Section */}
          <div className="mt-6 p-4 rounded" style={{backgroundColor: 'white', border: `1px solid ${colors.primary}30`}}>
            <h3 className="font-bold text-lg mb-3" style={{color: colors.primary}}>Example Scenarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2" style={{color: colors.primaryDark}}>Small Field (5 acres):</h4>
                <p>• 10 GPA rate = 50 gallons total needed</p>
                <p>• Suggestion: Use 50-gallon fill (1 mix)</p>
                <p>• Perfect - no waste, no partial mix</p>
              </div>
              <div>
                <h4 className="font-medium mb-2" style={{color: colors.primaryDark}}>Large Field (45 acres):</h4>
                <p>• 15 GPA rate = 675 gallons total needed</p>
                <p>• Suggestion: Use 100-gallon fills</p>
                <p>• Result: 6 full mixes + 1 partial (75 gal)</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 rounded text-center text-sm" style={{backgroundColor: colors.primaryLight + '20'}}>
            <p><strong>Remember:</strong> Always verify calculations against product labels and follow all safety guidelines. This calculator is a planning tool - use your professional judgment!</p>
          </div>
        </div>
      )}

      <div 
        className="p-4 rounded-lg mb-6" 
        style={{backgroundColor: colors.primaryLight + '30'}}
      >
        <h2 className="font-bold mb-3" style={{color: colors.primaryDark}}>Mix Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Fill Volume (gallons)</label>
            <input
              type="number"
              value={fillVolume}
              onChange={(e) => handleFillVolumeChange(e.target.value)}
              className="w-full p-2 border rounded text-black"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Application Rate (GPA)</label>
            <input
              type="number"
              value={applicationRate}
              onChange={(e) => handleApplicationRateChange(e.target.value)}
              className="w-full p-2 border rounded text-black"
              min="0"
            />
          </div>
          <div>
            <div className="block text-sm font-medium mb-1">Acres Per Fill</div>
            <div className="w-full p-2 border rounded font-bold" style={{
              backgroundColor: colors.primary + '20',
              borderColor: colors.primary + '40'
            }}>
              {acresPerFill.toFixed(2)}
            </div>
          </div>
        </div>
        
        {/* Suggested Fill Volume */}
        {fieldSize > 0 && applicationRate > 0 && (() => {
          const suggested = calculateSuggestedFillVolume();
          if (suggested && suggested !== fillVolume) {
            return (
              <div className="mt-3 p-3 rounded" style={{backgroundColor: colors.secondary + '20'}}>
                <p className="text-sm">
                  <strong>Suggestion:</strong> For {fieldSize} acres, consider using{' '}
                  <button 
                    onClick={() => handleFillVolumeChange(suggested)}
                    className="underline font-bold"
                    style={{color: colors.primaryDark}}
                  >
                    {suggested} gallons
                  </button>{' '}
                  as your fill volume
                </p>
              </div>
            );
          }
          return null;
        })()}
      </div>

      <div 
        className="p-4 rounded-lg mb-6"
        style={{backgroundColor: colors.secondaryLight + '30'}}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
          <h2 className="font-bold" style={{color: colors.primaryDark}}>Products</h2>
          
          <button 
            onClick={addNewProduct}
            className="px-3 py-1 rounded-lg"
            style={{
              backgroundColor: colors.primary,
              color: 'white'
            }}
          >
            + Add Product
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: 'white',
                borderColor: colors.primary + '70'
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
                  className="w-3/4 p-2 border rounded text-black font-bold"
                  placeholder="Product Name"
                />
                <button 
                  onClick={() => removeProduct(product.id)}
                  className="p-1 rounded hover:bg-red-500 hover:text-white"
                  title="Remove Product"
                  style={{color: colors.primaryDark}}
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Rate</label>
                  <input
                    type="number"
                    value={product.rate}
                    onChange={(e) => handleProductChange(product.id, 'rate', parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border rounded text-black"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Unit</label>
                  <select
                    value={product.unit}
                    onChange={(e) => handleProductChange(product.id, 'unit', e.target.value)}
                    className="w-full p-2 border rounded text-black"
                  >
                    {unitOptions.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Amount for Tank</label>
                <div className="relative">
                  <div 
                    className="w-full p-2 border rounded font-bold cursor-pointer"
                    style={{
                      backgroundColor: colors.primary + '20',
                      borderColor: colors.primary + '50'
                    }}
                    onClick={() => toggleFormatMenu(product.id)}
                  >
                    {formatOutput(product.tankAmount, product.outputFormat)}
                  </div>
                  
                  {openFormatMenuId === product.id && (
                    <div 
                      className="absolute z-10 mt-1 w-full border rounded shadow-lg"
                      style={{
                        backgroundColor: 'white',
                        borderColor: colors.primary + '50'
                      }}
                    >
                      <ul>
                        {outputFormats.map(format => (
                          <li 
                            key={format.value}
                            className="px-3 py-2 cursor-pointer"
                            style={{
                              backgroundColor: product.outputFormat === format.value 
                                ? colors.primary + '20'
                                : 'transparent'
                            }}
                            onClick={() => selectFormat(product.id, format.value)}
                          >
                            {format.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Quantities Required */}
      {fieldSize > 0 && (
        <div 
          className="p-4 rounded-lg mb-6"
          style={{backgroundColor: colors.secondary + '20'}}
        >
          <h2 className="font-bold mb-3" style={{color: colors.primaryDark}}>
            Product Quantities Required
          </h2>
          
          {/* Mix Planning Summary */}
          {(() => {
            const mixPlanning = calculateMixPlanning();
            if (mixPlanning) {
              return (
                <div className="mb-4 p-3 rounded" style={{backgroundColor: 'white'}}>
                  <h3 className="font-bold mb-2" style={{color: colors.primary}}>Mix Planning</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>• Field size: <strong>{fieldSize} acres</strong></p>
                      <p>• Total spray needed: <strong>{mixPlanning.totalSprayNeeded.toFixed(0)} gallons</strong></p>
                      <p>• Full mixes needed: <strong>{mixPlanning.fullMixes}</strong></p>
                    </div>
                    <div>
                      {mixPlanning.hasPartialMix ? (
                        <>
                          <p>• Partial mix: <strong>{mixPlanning.remainingSpray.toFixed(1)} gallons</strong></p>
                          <p>• Remaining acres: <strong>{mixPlanning.remainingAcres.toFixed(2)} acres</strong></p>
                        </>
                      ) : (
                        <p className="text-green-600 font-medium">✓ Perfect fit - no partial mix needed</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })()}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Total Quantities */}
            <div>
              <h3 className="font-bold mb-3" style={{color: colors.primaryDark}}>Total Product to Purchase</h3>
              <div className="space-y-3">
                {products.map((product) => {
                  const totalAmount = calculateFieldAmount(product.rate, product.unit, fieldSize);
                  const purchaseInfo = formatPurchaseAmount(totalAmount);
                  
                  return (
                    <div 
                      key={`purchase-${product.id}`}
                      className="p-3 rounded border"
                      style={{
                        backgroundColor: 'white',
                        borderColor: colors.secondary + '70'
                      }}
                    >
                      <h4 className="font-bold mb-2" style={{color: colors.primaryDark}}>
                        {product.name}
                      </h4>
                      <div className="mb-2">
                        <span className="text-sm">Total needed: </span>
                        <span className="font-bold text-lg">{purchaseInfo.display}</span>
                      </div>
                      
                      {purchaseInfo.containers.length > 0 && (
                        <div className="mt-2">
                          <h5 className="text-xs font-medium mb-1">Purchase Options:</h5>
                          {purchaseInfo.containers.slice(0, 2).map((option, index) => (
                            <div 
                              key={index}
                              className="p-2 mb-1 rounded text-xs"
                              style={{
                                backgroundColor: index === 0 
                                  ? colors.secondary + '30' 
                                  : colors.primary + '10',
                                border: index === 0 
                                  ? `1px solid ${colors.secondary}` 
                                  : `1px solid ${colors.primary}30`
                              }}
                            >
                              <div className="font-medium">{option.display}</div>
                              <div className="text-xs">
                                Waste: {option.waste.toFixed(1)} fl oz ({option.wastePercent.toFixed(1)}%)
                                {index === 0 && <span className="ml-2 font-medium">← Best</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Mix Breakdown */}
            <div>
              <h3 className="font-bold mb-3" style={{color: colors.primaryDark}}>Mix Breakdown</h3>
              <div className="space-y-3">
                {/* Full Mixes */}
                <div 
                  className="p-3 rounded border"
                  style={{
                    backgroundColor: 'white',
                    borderColor: colors.primary + '70'
                  }}
                >
                  <h4 className="font-bold mb-2" style={{color: colors.primary}}>
                    Full Mixes ({(() => {
                      const mixPlanning = calculateMixPlanning();
                      return mixPlanning ? mixPlanning.fullMixes : 0;
                    })()})
                  </h4>
                  <p className="text-sm mb-2">Each mix uses {fillVolume} gallons covering {acresPerFill.toFixed(2)} acres</p>
                  <div className="space-y-1">
                    {products.map(product => (
                      <div key={`full-${product.id}`} className="text-sm">
                        <strong>{product.name}:</strong> {formatOutput(product.tankAmount, product.outputFormat)} per mix
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Partial Mix */}
                {(() => {
                  const mixPlanning = calculateMixPlanning();
                  if (mixPlanning && mixPlanning.hasPartialMix) {
                    return (
                      <div 
                        className="p-3 rounded border"
                        style={{
                          backgroundColor: 'white',
                          borderColor: colors.secondary + '70'
                        }}
                      >
                        <h4 className="font-bold mb-2" style={{color: colors.secondary.replace('#', '').length === 6 ? colors.secondaryDark : colors.secondary}}>
                          Partial Mix (1)
                        </h4>
                        <p className="text-sm mb-2">
                          {mixPlanning.remainingSpray.toFixed(1)} gallons for {mixPlanning.remainingAcres.toFixed(2)} acres
                        </p>
                        <div className="space-y-1">
                          {products.map(product => {
                            const partialAmount = calculateAmount(product.rate, product.unit, mixPlanning.remainingSpray, applicationRate);
                            return (
                              <div key={`partial-${product.id}`} className="text-sm">
                                <strong>{product.name}:</strong> {formatOutput(partialAmount, product.outputFormat)}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      <div 
        className="p-4 rounded-lg"
        style={{backgroundColor: colors.secondaryLight + '20'}}
      >
        <div className="flex justify-between items-start">
          <h2 className="font-bold mb-3" style={{color: colors.primaryDark}}>Summary</h2>
          <div className="relative">
            <button 
              onClick={copyToClipboard}
              className="p-2 rounded-lg"
              style={{backgroundColor: colors.primary + '20'}}
              title="Copy to Clipboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={colors.primary} className="bi bi-clipboard" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
              </svg>
            </button>
            {copyFeedback && (
              <div className="absolute right-0 mt-2 px-2 py-1 bg-white border rounded-lg shadow-lg" style={{color: copyFeedback.includes('Failed') ? 'red' : colors.primary}}>
                {copyFeedback}
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="mb-1">For a <strong>{fillVolume} gallon</strong> mix at <strong>{applicationRate} GPA</strong>:</p>
          <p className="mb-1">• This mix will cover <strong>{acresPerFill.toFixed(2)} acres</strong></p>
          <p className="mb-3">• Add the following to your mix:</p>
          <ul className="list-disc pl-6">
            {products.map(product => (
              <li key={product.id} className="mb-1">
                <strong>{product.name}:</strong> {formatOutput(product.tankAmount, product.outputFormat)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div 
        className="p-4 rounded-lg mt-6"
        style={{backgroundColor: colors.primaryLight + '15'}}
      >
        <h2 className="font-bold mb-3" style={{color: colors.primaryDark}}>Field Operations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Field Size (acres)</label>
            <input
              type="number"
              value={fieldSize}
              onChange={(e) => setFieldSize(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border rounded text-black"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Implement Width (feet)</label>
            <input
              type="number"
              value={implementWidth}
              onChange={(e) => setImplementWidth(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border rounded text-black"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Speed (mph)</label>
            <input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border rounded text-black"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fill Time (minutes)</label>
            <input
              type="number"
              value={fillTime}
              onChange={(e) => setFillTime(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border rounded text-black"
              min="0"
            />
          </div>
        </div>
        
        <div 
          className="p-3 rounded"
          style={{
            backgroundColor: 'white',
            borderLeft: `4px solid ${colors.primary}`
          }}
        >
          <h3 className="font-bold mb-2" style={{color: colors.primary}}>Field Operations Estimates</h3>
          {calculateFieldOperations()}
        </div>
      </div>
      
      <div className="mt-4 text-sm opacity-70" style={{color: colors.primaryDark}}>
        <p>Note: Always verify calculations against product labels and follow all safety guidelines.</p>
      </div>
    </div>
  </div>
  );
};

export default AgSprayCalculator;
