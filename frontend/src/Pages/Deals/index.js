
import React, { useContext } from 'react';
import { Text, Paper, Box, Container, Grid, SimpleGrid, rem, NavLink, Badge, Flex, Button, Anchor, Chip } from '@mantine/core';
import { LoremIpsum } from 'lorem-ipsum';
import { Link } from 'react-router-dom';
import { ContentContext, ContentProvider } from '../../context/ContentContext.tsx';
import ProductCard from '../Home/ProductCard/ProductCard.tsx';
import FooterLinks from '../Footer/FooterLinks.tsx';

const lorem = new LoremIpsum();

export default function Deals() {
    const {dataFromBackend, products} = useContext(ContentContext)

    const selectedRange = dataFromBackend.slice(8, 15 + 1);

    return (
        <div>
            <div className="bg-blue-500 p-4 py-6 px-6">
                <h1 className='text-3xl text-white font-semibold'>Deals</h1>

                <p className='my-5 text-white'>{lorem.generateSentences(5)}</p>
            </div>

        {/* Product Cards */}
       <Paper withBorder shadow="xs" px="xl" py='md' m='md' mt='xl'>
       <div
        className='flex flex-row justify-between items-center my-3'
      >

        <Text my={8} fz={22} fw={500} size='xl'>Products</Text>
        <Link to='/products'>
        <div className="flex flex-row items-center">
        <Anchor href="/products" target="_blank" underline="hover" size='sm'>
          View More
        </Anchor>
        {/* <IconArrowRight size={22} /> */}
      </div>
        </Link>
          
        </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 justify-center items-center mb-8">
              {selectedRange.map((product, index) => (
                <div
                  key={index}
                  className="w-full h-full"
                >
                  <ProductCard data={product} />
                </div>
              ))}
            </div>
       </Paper>

       
       <FooterLinks />
        </div>
    );
}


