'use client';

import { useEffect, useState } from 'react';
import { Button, RadioGroup, Radio } from '@heroui/react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useOrder } from '@/context/OrderContext';

// Componente de Gaseosas
interface SoftDriknsCompProps {}

export const SoftDriknsComp: React.FC<SoftDriknsCompProps> = () => {

  const { addOrderItem } = useOrder();
  const [selectedSoda, setSelectedSoda] = useState<string>('');
  const [selectedJuice, setSelectedJuice] = useState<string|null>(null);

  const [delValleFlavorSelected, setDelValleFlavorSelected] = useState<string | null>(null);
  const [delValleSelected, setDelValleSelected] = useState<boolean>(false);

  const sodas = [
    {
      id: 'coca-cola',
      label: 'CocaCola',
      icon: '🥤',
      price: 20,
      size: '2 ltrs.',
    },
    {
      id: 'fanta',
      label: 'Fanta',
      icon: '🍊',
      price: 20,
      size: '2 ltrs.',
    },
    {
      id: 'sprite',
      label: 'Sprite',
      icon: '💚',
      price: 20,
      size: '2 ltrs.',
    },
  ];

  const juices = [
    {
      id: 'del-valle',
      label: 'Del Valle',
      icon: '',
      price: 15,
      size: '1 ltrs.',
      flavors: [
        {
          id: 'manzana',
          label: 'Manzana',
          size: '1 ltrs.',
        },
        {
          id: 'durazno',
          label: 'Durazno',
          size: '1 ltrs.',
        },
      ],
    },
    {
      id: 'limonada',
      label: 'Limonada',
      icon: '',
      price: 10,
      size: '1 ltrs.',
    },
  ];

  const handleDelValleJuiceChange = (
    event: React.MouseEvent<HTMLElement>,
    newJuiceSelected: string | null
  ) => {
    setDelValleFlavorSelected(newJuiceSelected);
  };

  useEffect(() => {
    setDelValleSelected(false);
    if (selectedJuice === 'del-valle') {
      setDelValleSelected(true);
    }else{
      setDelValleFlavorSelected(null);
    }
  }, [selectedJuice]);

  const addSodaToOrder = () => {
    if (!selectedSoda) return;

    const soda = sodas.find((s) => s.id === selectedSoda);
    if (!soda) return;

    const newOrderItem = {
      id: `${Date.now()}-soda-${selectedSoda}`,
      productType: 'soda' as const,
      description: soda.label,
      quantity: 1,
      price: soda.price,
      details: {},
    };

    addOrderItem(newOrderItem);
    setSelectedSoda('');
  };

  return (
    <div className='space-y-6'>
      <div className='bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-200'>
        <h3 className='text-lg font-bold text-red-800 mb-3 flex items-center gap-2'>
          🥤 Gaseosas
        </h3>
        <RadioGroup value={selectedJuice} onValueChange={setSelectedJuice}>
          <div className='flex gap-4 justify-center'>
            {sodas.map((soda) => (
              <Radio key={soda.id} value={soda.id} className='p-2'>
                <div className='flex flex-col justify-between items-center w-full'>
                  <span className='text-xl'>
                    {soda.icon} {soda.label}
                  </span>
                  <span className='text-sm text-gray-600'>({soda.size})</span>
                </div>
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className='bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-200'>
        <h3 className='text-lg font-bold text-red-800 mb-3 flex items-center gap-2'>
          🥤 Jugos
        </h3>
        <div className='flex flex-col gap-3'>
          <RadioGroup value={selectedJuice} onValueChange={setSelectedJuice}>
            <div className='flex gap-4 justify-center'>
              {juices.map((juice) => (
                <Radio key={juice.id} value={juice.id} className='p-2'>
                  <div className='flex flex-col justify-between items-center w-full'>
                    <span className='text-xl'>
                      {juice.icon} {juice.label}
                    </span>
                    <span className='text-sm text-gray-600'>
                      ({juice.size})
                    </span>
                  </div>
                </Radio>
              ))}
            </div>
          </RadioGroup>
          <div className='text-center'>
            {delValleSelected ? (
              <ToggleButtonGroup
                value={delValleFlavorSelected}
                orientation='vertical'
                exclusive
                onChange={handleDelValleJuiceChange}
                size='small'
                className='w-1/2'
              >
                {juices[0].flavors?.map((element, index) => {
                  return (
                    <ToggleButton
                      key={index}
                      value={element.id}
                      className='flex-1'
                    >
                      <div className='flex items-center py-1 gap-2'>
                        <span className='font-semibold'>{element.label}</span>
                        <span className='text-xs text-gray-600'>
                          ({element.size})
                        </span>
                      </div>
                    </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/* Vista Previa */}
      {selectedSoda && (
        <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
          <h4 className='text-sm font-semibold text-blue-800 mb-2'>
            Vista Previa:
          </h4>
          <p className='text-blue-900 font-medium'>
            {sodas.find((s) => s.id === selectedSoda)?.label}
          </p>
          <p className='text-blue-700 text-sm mt-1'>Precio: Bs. 10.00</p>
        </div>
      )}

      <div className='flex justify-end'>
        <Button
          isDisabled={!selectedSoda}
          color='secondary'
          onPress={addSodaToOrder}
          size='sm'
          className='font-bold'
        >
          Agregar al Pedido
        </Button>
      </div>
    </div>
  );
};

// Componente de Jugos
interface JuicesCompProps {}

export const JuicesComp: React.FC<JuicesCompProps> = () => {
  const { addOrderItem } = useOrder();
  const [juiceSize, setJuiceSize] = useState<string | null>(null);
  const [juiceFlavor, setJuiceFlavor] = useState<string>('');

  const flavors = [
    { id: 'naranja', label: 'Naranja', icon: '🍊' },
    { id: 'papaya', label: 'Papaya', icon: '🍈' },
  ];

  const handleSizeChange = (
    event: React.MouseEvent<HTMLElement>,
    newSize: string | null
  ) => {
    setJuiceSize(newSize);
  };

  const addJuiceToOrder = () => {
    if (!juiceSize || !juiceFlavor) return;

    const flavor = flavors.find((f) => f.id === juiceFlavor)?.label || '';
    const sizeText = juiceSize === 'glass' ? 'Vaso' : 'Jarra';
    const price = juiceSize === 'glass' ? 12 : 25;

    const newOrderItem = {
      id: `${Date.now()}-juice-${juiceFlavor}`,
      productType: 'juice' as const,
      description: `Jugo de ${flavor} - ${sizeText}`,
      quantity: 1,
      price: price,
      details: {
        size: juiceSize,
      },
    };

    addOrderItem(newOrderItem);

    // Reiniciar selección
    setJuiceSize(null);
    setJuiceFlavor('');
  };

  const isValid = juiceSize !== null && juiceFlavor !== '';
  const currentPrice = juiceSize === 'glass' ? 12 : juiceSize === 'pitcher' ? 25 : 0;

  return (
    <div className='space-y-6'>
      {/* Sabor */}
      <div className='bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200'>
        <h3 className='text-lg font-bold text-orange-800 mb-3 flex items-center gap-2'>
          🍹 Sabor del Jugo
        </h3>
        <RadioGroup value={juiceFlavor} onValueChange={setJuiceFlavor}>
          <div className='flex flex-col gap-3'>
            {flavors.map((flavor) => (
              <Radio key={flavor.id} value={flavor.id} className='p-2'>
                <span className='font-medium'>
                  {flavor.icon} {flavor.label}
                </span>
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Tamaño */}
      <div className='bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200'>
        <h3 className='text-lg font-bold text-orange-800 mb-3'>Tamaño</h3>
        <ToggleButtonGroup
          value={juiceSize}
          exclusive
          onChange={handleSizeChange}
          className='w-full'
        >
          <ToggleButton value='glass' className='flex-1'>
            <div className='flex flex-col items-center py-1'>
              <span className='font-semibold'>Vaso</span>
              <span className='text-xs text-gray-600'>Bs. 12</span>
            </div>
          </ToggleButton>
          <ToggleButton value='pitcher' className='flex-1'>
            <div className='flex flex-col items-center py-1'>
              <span className='font-semibold'>Jarra</span>
              <span className='text-xs text-gray-600'>Bs. 25</span>
            </div>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {/* Vista Previa */}
      {isValid && (
        <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
          <h4 className='text-sm font-semibold text-blue-800 mb-2'>
            Vista Previa:
          </h4>
          <p className='text-blue-900 font-medium'>
            Jugo de {flavors.find((f) => f.id === juiceFlavor)?.label} -{' '}
            {juiceSize === 'glass' ? 'Vaso' : 'Jarra'}
          </p>
          <p className='text-blue-700 text-sm mt-1'>
            Precio: Bs. {currentPrice.toFixed(2)}
          </p>
        </div>
      )}

      {/* Botón Agregar */}
      <div className='flex justify-end'>
        <Button
          isDisabled={!isValid}
          color='secondary'
          onPress={addJuiceToOrder}
          size='lg'
          className='font-bold'
        >
          Agregar al Pedido
        </Button>
      </div>
    </div>
  );
};
