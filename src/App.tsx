  // Save settings to cookies
  const saveSettings = () => {
    try {
      // Create the settings object
      const settings = {
        tankSize,
        applicationRate,
        products,
        fieldSize,
        implementWidth,
        speed,
        fillTime
      };
      
      // Save to localStorage (better than cookies for larger data)
      localStorage.setItem('agSprayCalcSettings', JSON.stringify(settings));
      
      // Show feedback
      setSettingsFeedback('Settings saved!');
      setTimeout(() => setSettingsFeedback(''), 2000);
    } catch (err) {
      setSettingsFeedback('Error saving settings');
      console.error('Failed to save settings:', err);
      setTimeout(() => setSettingsFeedback(''), 2000);
    }
  };
  
  // Load settings from cookies
  const loadSettings = () => {
    try {
      // Get saved settings
      const savedSettings = localStorage.getItem('agSprayCalcSettings');
      
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Apply saved settings
        if (settings.tankSize) setTankSize(settings.tankSize);
        if (settings.applicationRate) setApplicationRate(settings.applicationRate);
        if (settings.products) setProducts(settings.products);
        if (settings.fieldSize) setFieldSize(settings.fieldSize);
        if (settings.implementWidth) setImplementWidth(settings.implementWidth);
        if (settings.speed) setSpeed(settings.speed);
        if (settings.fillTime) setFillTime(settings.fillTime);
        
        // Recalculate product amounts
        setTimeout(() => {
          if (settings.products) {
            setProducts(currentProducts => 
              currentProducts.map(product => ({
                ...product,
                tankAmount: calculateAmount(
                  product.rate, 
                  product.unit, 
                  settings.tankSize, 
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
  };import React, { useState, useEffect } from 'react';

const AgSprayCalculator = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', rate: 0, unit: 'oz/acre', tankAmount: 0, outputFormat: 'auto' }
  ]);
  const [tankSize, setTankSize] = useState(0);
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
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  // Load saved settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Custom color theme
  const colors = {
    primary: '#498a5a', // Green
    secondary: '#d1c343', // Yellow
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

  // Calculate acres per tank
  const acresPerTank = applicationRate > 0 ? tankSize / applicationRate : 0;

  // Convert any rate to oz based on unit type
  const convertToOz = (rate, unit) => {
    if (unit.startsWith('oz')) return rate;
    if (unit.startsWith('pt')) return rate * 16; // 1 pint = 16 fl oz
    if (unit.startsWith('qt')) return rate * 32; // 1 quart = 32 fl oz
    if (unit.startsWith('gal')) return rate * 128; // 1 gallon = 128 fl oz
    if (unit.startsWith('lb')) return rate * 16; // Approximation
    if (unit.startsWith('g')) return rate * 0.033814; // g to fl oz conversion
    return rate; // Default fallback
  };

  // Calculate amount for a single product
  const calculateAmount = (rate, unit, currentTankSize = tankSize, currentAppRate = applicationRate) => {
    if (!rate || rate === 0) return 0;
    
    let amount = 0;
    
    // Calculate acres per tank based on current values
    const currentAcresPerTank = currentAppRate > 0 ? currentTankSize / currentAppRate : 0;
    
    // Handle "per X gal" units (concentrations)
    if (unit.includes('per') && unit.includes('gal')) {
      const gallonsMatch = unit.match(/per (\d+) gal/);
      if (gallonsMatch && gallonsMatch[1]) {
        const gallonsReferenced = parseInt(gallonsMatch[1]);
        const rateInOz = convertToOz(rate, unit);
        amount = (rateInOz * currentTankSize) / gallonsReferenced;
      }
    } 
    // Handle per acre units 
    else if (unit.includes('/acre')) {
      const rateInOz = convertToOz(rate, unit);
      amount = rateInOz * currentAcresPerTank;
    }
    
    return amount;
  };

  // Format the output amount in appropriate units
  const formatOutput = (value, format) => {
    if (value === 0) return '0 fl oz';
    
    // Force specific output format based on selection
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
        // If less than 2 gallons (256 fl oz), show only in fl oz
        if (value < 256) {
          return `${value.toFixed(1)} fl oz`;
        } 
        // For larger amounts, show in gallons
        else {
          const gallonsAuto = Math.floor(value / 128);
          const ozRemainingAuto = (value % 128).toFixed(1);
          
          // Calculate if it's a clean multiple of 2.5 gallons
          const totalGallons = value / 128;
          const is25GallonMultiple = Math.abs(totalGallons / 2.5 - Math.round(totalGallons / 2.5)) < 0.01;
          
          let result = '';
          
          if (parseFloat(ozRemainingAuto) === 0) {
            result = `${gallonsAuto} gal`;
          } else {
            result = `${gallonsAuto} gal ${ozRemainingAuto} fl oz`;
          }
          
          // Add note about 2.5 gallon jugs if applicable
          if (is25GallonMultiple) {
            const jugs = Math.round(totalGallons / 2.5);
            result += ` (${jugs} × 2.5 gal jugs)`;
          }
          
          return result;
        }
    }
  };

  // Generate summary text for clipboard
  const generateSummaryText = () => {
    let text = `AG SPRAY MIX CALCULATOR SUMMARY\n`;
    text += `=============================\n\n`;
    text += `TANK INFORMATION:\n`;
    text += `Tank Size: ${tankSize} gallons\n`;
    text += `Application Rate: ${applicationRate} GPA\n`;
    text += `Acres Per Tank: ${acresPerTank.toFixed(2)}\n\n`;
    
    text += `PRODUCTS TO ADD:\n`;
    products.forEach(product => {
      text += `${product.name}: ${formatOutput(product.tankAmount, product.outputFormat)}\n`;
    });
    
    if (fieldSize && implementWidth && speed) {
      text += `\nFIELD OPERATIONS:\n`;
      text += `Field Size: ${fieldSize} acres\n`;
      text += `Implement Width: ${implementWidth} ft\n`;
      text += `Speed: ${speed} mph\n`;
      text += `Fill Time: ${fillTime} minutes\n\n`;
      
      const acresPerHour = speed * implementWidth * 0.1212;
      const tanksNeeded = fieldSize / acresPerTank;
      const sprayHours = fieldSize / acresPerHour;
      const totalFillTimeHours = (fillTime / 60) * tanksNeeded;
      const totalJobHours = sprayHours + totalFillTimeHours;
      const effectiveAcresPerHour = fieldSize / totalJobHours;
      const totalGallons = fieldSize * applicationRate;
      
      // Calculate ETA
      const completionTime = new Date(currentTime.getTime() + totalJobHours * 60 * 60 * 1000);
      
      const formatTime = (hours) => {
        const wholeHours = Math.floor(hours);
        const minutes = Math.round((hours - wholeHours) * 60);
        return `${wholeHours} hr ${minutes} min`;
      };
      
      // Format ETA for clipboard
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
      text += `Tanks Needed: ${Math.ceil(tanksNeeded)} (${tanksNeeded.toFixed(1)})\n`;
      text += `Total Gallons: ${totalGallons.toFixed(0)} gallons\n`;
      text += `Spray Time: ${formatTime(sprayHours)}\n`;
      text += `Total Fill Time: ${formatTime(totalFillTimeHours)}\n`;
      text += `Estimated Job Completion: ${formatTime(totalJobHours)}\n`;
      text += `Estimated Finish Time: ${formatETAText(completionTime)}\n`;
    }
    
    return text;
  };
  
  // Copy summary to clipboard with fallback method
  const copyToClipboard = async () => {
    const text = generateSummaryText();
    
    try {
      // Primary method using Clipboard API
      await navigator.clipboard.writeText(text);
      setCopyFeedback('Copied to clipboard!');
    } catch (err) {
      // Fallback method for browsers with restricted clipboard access
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopyFeedback('Copied to clipboard!');
      console.error('Used fallback copy method due to:', err);
    }
    
    // Clear feedback after 2 seconds
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  // Update tank amounts for all products
  const updateAllProducts = () => {
    setProducts(currentProducts => 
      currentProducts.map(product => ({
        ...product,
        tankAmount: calculateAmount(product.rate, product.unit)
      }))
    );
  };

  // Set tank size with validation
  const handleTankSizeChange = (value) => {
    const newValue = parseFloat(value) || 0;
    setTankSize(newValue);
    // Update product amounts immediately in the same function
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
    // Update product amounts immediately in the same function
    setProducts(currentProducts => 
      currentProducts.map(product => ({
        ...product,
        tankAmount: calculateAmount(product.rate, product.unit, tankSize, newValue)
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
            // Immediately calculate the new tank amount if rate or unit changes
            tankAmount: (field === 'rate' || field === 'unit') 
              ? calculateAmount(
                  field === 'rate' ? value : product.rate,
                  field === 'unit' ? value : product.unit,
                  tankSize,
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
    // Check if tank information is missing
    if (!tankSize || !applicationRate) {
      return (
        <div className="p-3 rounded" style={{backgroundColor: colors.secondaryLight + '30'}}>
          <p><strong>Important:</strong> Please enter your tank size and application rate in the Tank Information section above.</p>
        </div>
      );
    }
    
    // Check if field operation inputs are missing
    if (!speed || !implementWidth || !fieldSize || !acresPerTank) {
      return (
        <div className="p-3 rounded" style={{backgroundColor: colors.secondaryLight + '30'}}>
          <p>Please fill in all field operation values above to see estimates.</p>
          <p className="text-sm mt-2">These calculations will show:</p>
          <ul className="list-disc pl-6 text-sm mt-1">
            <li>Working rate (acres/hour)</li>
            <li>Effective rate with filling time</li>
            <li>Number of tanks needed</li>
            <li>Total gallons required</li>
            <li>Estimated spray and fill times</li>
            <li>Estimated completion time (ETA)</li>
          </ul>
        </div>
      );
    }
    
    // Acres per hour calculation (without filling time)
    // Formula: (speed (mph) * width (ft) * 0.1212) = acres/hr
    // 0.1212 is the conversion factor
    const acresPerHour = speed * implementWidth * 0.1212;
    
    // Number of tanks needed
    const tanksNeeded = fieldSize / acresPerTank;
    
    // Total spray time (not including filling)
    const sprayHours = fieldSize / acresPerHour;
    
    // Total fill time in hours
    const totalFillTimeHours = (fillTime / 60) * tanksNeeded;
    
    // Total job time (spray + fill)
    const totalJobHours = sprayHours + totalFillTimeHours;
    
    // Acres per hour with filling time factored in
    const effectiveAcresPerHour = fieldSize / totalJobHours;
    
    // Total gallons to be sprayed
    const totalGallons = fieldSize * applicationRate;
    
    // Calculate ETA
    const completionTime = new Date(currentTime.getTime() + totalJobHours * 60 * 60 * 1000);
    
    // Format time to hours and minutes
    const formatTime = (hours) => {
      const wholeHours = Math.floor(hours);
      const minutes = Math.round((hours - wholeHours) * 60);
      return `${wholeHours} hr ${minutes} min`;
    };
    
    // Format ETA as time
    const formatETA = (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      
      // Get day information
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
        <p>• Tanks needed: <strong>{Math.ceil(tanksNeeded)} tanks</strong> ({tanksNeeded.toFixed(1)})</p>
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

      <div 
        className="p-4 rounded-lg mb-6" 
        style={{backgroundColor: colors.primaryLight + '30'}}
      >
        <h2 className="font-bold mb-3" style={{color: colors.primaryDark}}>Tank Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tank Size (gallons)</label>
            <input
              type="number"
              value={tankSize}
              onChange={(e) => handleTankSizeChange(e.target.value)}
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
            <div className="block text-sm font-medium mb-1">Acres Per Tank</div>
            <div className="w-full p-2 border rounded font-bold" style={{
              backgroundColor: colors.primary + '20',
              borderColor: colors.primary + '40'
            }}>
              {acresPerTank.toFixed(2)}
            </div>
          </div>
        </div>
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
          <p className="mb-1">For a <strong>{tankSize} gallon</strong> tank at <strong>{applicationRate} GPA</strong>:</p>
          <p className="mb-1">• This tank will cover <strong>{acresPerTank.toFixed(2)} acres</strong></p>
          <p className="mb-3">• Add the following to your tank:</p>
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
