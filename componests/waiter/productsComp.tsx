'use client';

import { Tabs, Tab, Card, CardBody } from '@heroui/react';
import { useEffect, useState } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Checkbox, Button } from '@heroui/react';

interface ProductsCompProps {}

const products = [
  {
    name: 'Alitas',
    icon: '...',
  },
  {
    name: 'Cerveza Artesanal',
    icon: '...',
  },
  {
    name: 'Soda',
    icon: '...',
  },
  {
    name: 'Refresco',
    icon: '...',
  },
  // {
  //   name: 'Alitas',
  //   icon: '...',
  // },
];

interface ChickenWingsCompProps {}

const ChickenWingsComp: React.FC<ChickenWingsCompProps> = () => {

  const wingsAmounts = [
    {
      id: '10-wings',
      label: '10 piezas',
    },
    {
      id: '15-wings',
      label: '15 piezas',
    },
    {
      id: '20-wings',
      label: '20 piezas',
    },
  ];

  
  const searchValue = (wingsAm, key:string)=>{
    for(let i=0; i<wingsAm.length; i++){
      if(wingsAm[i].id=== key){
        return wingsAm[i].label
      }
    }
  }

  const [sizeSelection, setSizeSelection] = useState<string | null>(null);
  const [textualOrder, setTextualOrder] = useState<string>('');

  const [isSelectedSpicy, setIsSelectedSpicy] = useState(false);
  const [isSelectedBBQ, setIsSelectedBBQ] = useState(false);
  const [isSelectedHoneyMustard, setIsSelectedHoneyMustard] = useState(false);

  const handleSelection = (
    event: React.MouseEvent<HTMLElement>,
    newSelection: string | null
  ) => {
    setSizeSelection(newSelection);
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

      // let saucesText = ''
      // if(Array.isArray(sauces) && sauces.length > 0){
      //   saucesText = sauces.join()
      // }
      
      const textualOrder =
        sauces.length === 0
          ? `${textualAmount} de alitas`
          : `${textualAmount} de alitas con (${sauces.join(', ')})`;
      
      setTextualOrder(textualOrder)
    }



    if (sizeSelection === null) {
      setTextualOrder('')
      setIsSelectedSpicy(false);
      setIsSelectedBBQ(false);
      setIsSelectedHoneyMustard(false);
    }

  }, [sizeSelection, isSelectedSpicy, isSelectedBBQ, isSelectedHoneyMustard]);

  const buildChickenWingsOrderItem = () => {

  }

  return (
    <>
      <ToggleButtonGroup        value={sizeSelection}
        exclusive
        onChange={handleSelection}
        aria-label='text alignment'
      >
        {wingsAmounts.map((element, index) => {
          return (
            <ToggleButton
              key={index}
              value={element.id}
              aria-label={element.label}
            >
              {element.label}
            </ToggleButton>
          );
        })}
        {/* <ToggleButton value='left' aria-label='left aligned'>
          10 piezas
        </ToggleButton>
        <ToggleButton value='center' aria-label='centered'>
          12 piezas
        </ToggleButton>
        <ToggleButton value='right' aria-label='right aligned'>
          14 piezas
        </ToggleButton> */}

        {/* <ToggleButton value='justify' aria-label='justified' disabled>
          
        </ToggleButton> */}
      </ToggleButtonGroup>
      <div>
        <div>Salsas</div>

        <div className='flex gap-2'>
          <Checkbox
            isDisabled={sizeSelection === null}
            isSelected={isSelectedSpicy}
            onValueChange={setIsSelectedSpicy}
          >
            Picante
          </Checkbox>
          <Checkbox
            isDisabled={sizeSelection === null}
            isSelected={isSelectedBBQ}
            onValueChange={setIsSelectedBBQ}
          >
            Barbacoa
          </Checkbox>
          <Checkbox
            isDisabled={sizeSelection === null}
            isSelected={isSelectedHoneyMustard}
            onValueChange={setIsSelectedHoneyMustard}
          >
            Mostaza con Miel
          </Checkbox>
        </div>
      </div>

      <div>
        <Button isDisabled={sizeSelection === null} color='secondary'>Agregar</Button>
        <div>{textualOrder}</div>
      </div>
    </>
  );
};

const ProductsComp: React.FC<ProductsCompProps> = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='font-semibold mb-2'>Productos disponibles</div>

      <Tabs aria-label='Options' className='flex flex-col'>
        <Tab key='alitas' title='Alitas'>
          <Card>
            <CardBody>
              <ChickenWingsComp />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='cerveza' title='Cerveza Artesanal'>
          <Card>
            <CardBody>Cerveza artesanal</CardBody>
          </Card>
        </Tab>
        <Tab key='soda' title='Gaseosas'>
          <Card>
            <CardBody>Gaseosas</CardBody>
          </Card>
        </Tab>
        <Tab key='juice' title='Jugos'>
          <Card>
            <CardBody>Jugos y refrescos</CardBody>
          </Card>
        </Tab>
        <Tab key='drinks' title='Bebidas'>
          <Card>
            <CardBody>Bebidas</CardBody>
          </Card>
        </Tab>
      </Tabs>

      {/* <ul>
        {products.map((element, index) => {
          return <li key={index}>{element.name}</li>;
        })}
      </ul> */}
    </div>
  );
};

export default ProductsComp;
