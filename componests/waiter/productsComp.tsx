'use client';

import { Tabs, Tab, Card, CardBody } from '@heroui/react';
import { useEffect, useState } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Checkbox, Button } from '@heroui/react';
import { IWings } from '@/util/types';
import { useOrder } from '@/context/OrderContext';

import { CraftBeerComp } from './order/craftBeerComp';



interface ChickenWingsCompProps {}

const ChickenWingsComp: React.FC<ChickenWingsCompProps> = () => {
  const { addOrderItem } = useOrder();

  const wingsAmounts = [
    {
      id: '4-wings',
      label: '4 piezas',
      price: 18
    },
    {
      id: '6-wings',
      label: '6 piezas',
      price: 25
    },
    {
      id: '10-wings',
      label: '10 piezas',
      price: 38
    },
    {
      id: '15-wings',
      label: '15 piezas',
      price: 55
    },
  ];

  const searchValue = (wingsAm:IWings[], key:string)=>{
    for(let i=0; i<wingsAm.length; i++){
      if(wingsAm[i].id=== key){
        return wingsAm[i].label
      }
    }
    return ''
  }

  const [sizeSelection, setSizeSelection] = useState<string | null>(null);
  const [textualOrder, setTextualOrder] = useState<string>('');

  const [isSelectedBBQ, setIsSelectedBBQ] = useState(false);
  const [isSelectedSpicy, setIsSelectedSpicy] = useState(false);
  const [isSelectedHoneyMustard, setIsSelectedHoneyMustard] = useState(false);

  const [friesSize, setFriesSize] = useState<string | null>(null);

  const saucesData = [
    {
      id: 'bbq',
      label: 'Barbacoa',
      icon: '🍖',
      stateSelected: isSelectedBBQ,
      onChangeMethod: setIsSelectedBBQ,
    },
    {
      id: 'spicy',
      label: 'Picante',
      icon: '🔥',
      stateSelected: isSelectedSpicy,
      onChangeMethod: setIsSelectedSpicy,
    },
    {
      id: 'bbq',
      label: 'Miel y mostaza',
      icon: '🍯',
      stateSelected: isSelectedHoneyMustard,
      onChangeMethod: setIsSelectedHoneyMustard,
    },
  ];

  const frenchFries = [
    {
      id: 'tam1',
      label: 'Porción 1',
      price: 7,
    },
    {
      id: 'tam2',
      label: 'Porción 2',
      price: 12,
    },
  ];

  const handleSelection = (
    event: React.MouseEvent<HTMLElement>,
    newSelection: string | null
  ) => {
    setSizeSelection(newSelection);
  };

  const handleFriesSelection = (
    event: React.MouseEvent<HTMLElement>,
    newSelection: string | null
  ) => {
    setFriesSize(newSelection);
  };

  useEffect(() => {

    if (sizeSelection !== null) {
      const textualAmount = searchValue(wingsAmounts, sizeSelection);
      const sauces:string[] = []

      setTextualOrder(textualAmount);

      if(isSelectedSpicy){
        sauces.push('Picante')
      }

      if (isSelectedBBQ) {
        sauces.push('Barbacoa');
      }

      if (isSelectedHoneyMustard) {
        sauces.push('Mostaza con miel');
      }

      let textualOrder =
        sauces.length === 0
          ? `${textualAmount} de alitas`
          : `${textualAmount} de alitas con (${sauces.join(', ')})`;

      // Agregar papas al texto si están seleccionadas
      if (friesSize === 'medium') {
        textualOrder += ' + Papas medianas';
      } else if (friesSize === 'large') {
        textualOrder += ' + Papas grandes';
      }

      setTextualOrder(textualOrder)
    }

    if (sizeSelection === null) {
      setTextualOrder('')
      setIsSelectedSpicy(false);
      setIsSelectedBBQ(false);
      setIsSelectedHoneyMustard(false);
      setFriesSize(null);
    }

  }, [sizeSelection, isSelectedSpicy, isSelectedBBQ, isSelectedHoneyMustard, friesSize]);

  const buildChickenWingsOrderItem = () => {
    if (sizeSelection === null) return;

    const sauces: string[] = [];
    if (isSelectedSpicy) sauces.push('Picante');
    if (isSelectedBBQ) sauces.push('Barbacoa');
    if (isSelectedHoneyMustard) sauces.push('Mostaza con miel');

    // Calcular precio base de las alitas
    let basePrice = sizeSelection === '10-wings' ? 30 : sizeSelection === '15-wings' ? 45 : 60;

    // Agregar precio de las papas si están seleccionadas
    if (friesSize === 'medium') {
      basePrice += 10;
    } else if (friesSize === 'large') {
      basePrice += 15;
    }

    const newOrderItem = {
      id: `${Date.now()}-${sizeSelection}`,
      productType: 'alitas' as const,
      description: textualOrder,
      quantity: 1,
      price: basePrice,
      details: {
        size: sizeSelection,
        sauces: sauces.length > 0 ? sauces : undefined,
        fries: friesSize || undefined,
      },
    };

    addOrderItem(newOrderItem);

    // Reiniciar selección después de agregar
    setSizeSelection(null);
    setIsSelectedSpicy(false);
    setIsSelectedBBQ(false);
    setIsSelectedHoneyMustard(false);
    setFriesSize(null);
  }

  return (
    <div className='space-y-6'>
      {/* Sección: Tamaño de Alitas */}
      <div className='bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200'>
        <h3 className='text-lg font-bold text-orange-800 mb-3 flex items-center gap-2'>
          🍗 Cantidad
        </h3>
        <ToggleButtonGroup
          value={sizeSelection}
          exclusive
          onChange={handleSelection}
          aria-label='text alignment'
          className='w-full'
        >
          {wingsAmounts.map((element, index) => {
            return (
              <ToggleButton
                key={index}
                value={element.id}
                aria-label={element.label}
                className='flex-1'
              >
                <div className='flex flex-col items-center py-1'>
                  <span className='font-semibold'>{element.label}</span>
                  <span className='text-xs text-gray-600'>
                    Bs.- {element.price}
                  </span>
                </div>
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </div>

      {/* Sección: Salsas y Papas en grid de 2 columnas */}
      <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
        {/* Sección: Salsas */}
        <div className='bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200'>
          <h3 className=' font-bold text-orange-800 mb-3 flex items-center gap-2'>
            🌶️ Salsas
          </h3>
          <div className='flex flex-wrap gap-3'>
            {saucesData.map((element, index) => {
              return (
                <Checkbox
                  isDisabled={sizeSelection === null}
                  isSelected={element.stateSelected}
                  onValueChange={element.onChangeMethod}
                  // color='danger'
                >
                  <span className='font-medium'>
                    {element.icon} {element.label}
                  </span>
                </Checkbox>
              );
            })}
          </div>
        </div>

        {/* Sección: Papas Fritas */}
        <div className='bg-gradient-to-r from-yellow-100 to-yellow-50 p-4 rounded-lg border border-yellow-300'>
          <h3 className='font-bold text-yellow-800 mb-3 flex items-center gap-2'>
            🍟 (+) Papas
          </h3>
          <ToggleButtonGroup
            value={friesSize}
            orientation='vertical'
            size='small'
            exclusive
            onChange={handleFriesSelection}
            aria-label='fries size'
            className='w-full'
          >
            {
              frenchFries.map((element, index)=>{
               return ( 
                <ToggleButton
                  key={index}
                  value={element.id}
                  // aria-label='papas medianas'
                  className='flex-1'
                  disabled={sizeSelection === null}
                >
                  <div className='flex flex-col items-center py-1'>
                    <span className='font-semibold'>{element.label}</span>
                    <span className='text-xs text-gray-600'>+ Bs. {element.price}</span>
                  </div>
                </ToggleButton>
               ); 
              })
            }
          </ToggleButtonGroup>
        </div>
      </div>

      {/* Vista Previa del Pedido */}
      {textualOrder && (
        <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
          <h4 className='text-sm font-semibold text-blue-800 mb-2'>
            Vista Previa:
          </h4>
          <p className='text-blue-900 font-medium'>{textualOrder}</p>
          <p className='text-blue-700 text-sm mt-1'>
            Precio Total: Bs.{' '}
            {(
              (sizeSelection === '10-wings'
                ? 30
                : sizeSelection === '15-wings'
                ? 45
                : 60) +
              (friesSize === 'medium' ? 10 : friesSize === 'large' ? 15 : 0)
            ).toFixed(2)}
          </p>
        </div>
      )}

      {/* Botón Agregar */}
      <div className='flex justify-end'>
        <Button
          isDisabled={sizeSelection === null}
          color='secondary'
          onPress={buildChickenWingsOrderItem}
          size='lg'
          className='font-bold'
        >
          Agregar al Pedido
        </Button>
      </div>
    </div>
  );
};

interface ProductsCompProps {}

const ProductsComp: React.FC<ProductsCompProps> = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='font-semibold mb-4 text-xl'>Menú del Restobar</div>

      <Tabs aria-label='Menu options' className='flex flex-col' size='lg'>
        <Tab key='alitas' title='🍗 Alitas'>
          <Card>
            <CardBody>
              <ChickenWingsComp />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='cerveza' title='🍺 Cerveza Artesanal'>
          <Card>
            <CardBody>
              <CraftBeerComp />
            </CardBody>
          </Card>
        </Tab>
        {/* <Tab key='soda' title='🥤 Gaseosas'>
          <Card>
            <CardBody>
              <SodasComp />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='juice' title='🍹 Jugos'>
          <Card>
            <CardBody>
              <JuicesComp />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='drinks' title='🍷 Tragos'>
          <Card>
            <CardBody>
              <CocktailsComp />
            </CardBody>
          </Card>
        </Tab> */}
      </Tabs>
    </div>
  );
};

export default ProductsComp;
