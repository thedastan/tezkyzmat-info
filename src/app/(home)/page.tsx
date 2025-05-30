 import Applications from '@/components/home/applications/Applications';
import BusinessProblems from '@/components/home/business-problems/BusinessProblems';
import Group from '@/components/home/group/Group';
import Hero from '@/components/home/hero/Hero';
import Instruction from '@/components/home/instruction/Instruction';
import Reviews from '@/components/home/reviews/Reviews';
import Service from '@/components/home/service/Service';
import Tariffs from '@/components/home/tariffs/Tariffs';
import WeTeam from '@/components/home/we-team/WeTeam';
import React from 'react';
 
 const Home = () => {
  return (
    <div>
       <Hero/>
       <Service/>
       <BusinessProblems/>
       <Instruction/>
       <Applications/>
       <Reviews/>
       <Group/>
       <WeTeam/>
       <Tariffs/>
    </div>
  );
 };
 
 export default Home;