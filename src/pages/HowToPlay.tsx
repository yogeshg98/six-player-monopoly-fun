
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Dice5, Home, Users, DollarSign, Map, Award } from 'lucide-react';

const HowToPlay = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold tracking-tight">How To Play</h1>
          <Button asChild variant="ghost">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Game
            </Link>
          </Button>
        </div>
        
        <div className="space-y-12 animate-fade-in">
          <section className="glass p-6 rounded-2xl shadow-glass">
            <h2 className="flex items-center gap-3 text-2xl font-semibold mb-4">
              <Users className="text-primary" size={24} />
              Getting Started
            </h2>
            <p className="text-lg mb-6">
              Monopoly is a classic board game for 2-6 players where the goal is to become the wealthiest player through buying, selling, and trading property.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Game Setup</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Select the number of players (2-6)</li>
                  <li>Each player starts with $1,500</li>
                  <li>All players begin on the GO space</li>
                  <li>Decide who will go first (randomly determined)</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Goal</h3>
                <p>
                  Be the last player with money remaining after all other players have gone bankrupt.
                </p>
              </div>
            </div>
          </section>
          
          <section className="glass p-6 rounded-2xl shadow-glass">
            <h2 className="flex items-center gap-3 text-2xl font-semibold mb-4">
              <Dice5 className="text-primary" size={24} />
              Taking Your Turn
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4 py-2">
                <h3 className="font-medium">1. Roll the dice</h3>
                <p className="text-muted-foreground">
                  Roll two dice and move your token clockwise around the board that number of spaces.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4 py-2">
                <h3 className="font-medium">2. Land on a space</h3>
                <p className="text-muted-foreground">
                  Depending on where you land, you can buy property, pay rent, draw a card, or go to jail.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4 py-2">
                <h3 className="font-medium">3. End your turn</h3>
                <p className="text-muted-foreground">
                  After completing your actions, end your turn to allow the next player to go.
                </p>
              </div>
              
              <div className="border-l-4 border-accent pl-4 py-2 bg-accent/30 rounded-r">
                <h3 className="font-medium">Rolling Doubles</h3>
                <p className="text-muted-foreground">
                  If you roll doubles (both dice show the same number), you get to roll again after completing your turn.
                  However, if you roll doubles three times in a row, you go directly to jail.
                </p>
              </div>
            </div>
          </section>
          
          <section className="glass p-6 rounded-2xl shadow-glass">
            <h2 className="flex items-center gap-3 text-2xl font-semibold mb-4">
              <Home className="text-primary" size={24} />
              Properties
            </h2>
            <div className="space-y-6">
              <p>
                When you land on an unowned property, you may buy it from the bank for the price listed on the board.
                If you choose not to buy it, the property remains unowned.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Owning Properties</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>If another player lands on your property, they must pay you rent</li>
                    <li>Collect complete color sets to build houses and increase rent</li>
                    <li>Railroad and utility values increase when you own multiple</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Property Types</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li><span className="font-medium">Color Properties</span>: Collect sets to build houses</li>
                    <li><span className="font-medium">Railroads</span>: Rent increases with more railroads owned</li>
                    <li><span className="font-medium">Utilities</span>: Rent based on dice roll</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <section className="glass p-6 rounded-2xl shadow-glass">
            <h2 className="flex items-center gap-3 text-2xl font-semibold mb-4">
              <Map className="text-primary" size={24} />
              Special Spaces
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">GO</h3>
                <p>Collect $200 salary every time you pass or land on GO.</p>
                
                <h3 className="text-lg font-medium">Just Visiting/Jail</h3>
                <p>If you're just visiting, nothing happens. If you're in jail, you must either roll doubles, pay $50, or use a Get Out of Jail Free card.</p>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Free Parking</h3>
                <p>Nothing happens when you land here.</p>
                
                <h3 className="text-lg font-medium">Go To Jail</h3>
                <p>Go directly to jail. Do not pass GO, do not collect $200.</p>
                
                <h3 className="text-lg font-medium">Income Tax</h3>
                <p>Pay $200 to the bank.</p>
              </div>
            </div>
          </section>
          
          <section className="glass p-6 rounded-2xl shadow-glass">
            <h2 className="flex items-center gap-3 text-2xl font-semibold mb-4">
              <Award className="text-primary" size={24} />
              Winning the Game
            </h2>
            <p className="text-lg">
              The game continues until all players except one have gone bankrupt. The last remaining player is the winner!
            </p>
            <div className="mt-6 bg-accent/30 p-4 rounded-lg">
              <h3 className="font-medium">Pro Tips</h3>
              <ul className="mt-2 space-y-2 list-disc pl-5">
                <li>Orange and red properties are landed on most frequently due to their distance from Jail</li>
                <li>Railroads offer consistent income throughout the game</li>
                <li>Don't underestimate the power of trading to complete color sets</li>
                <li>Manage your cash - don't spend everything on properties early</li>
              </ul>
            </div>
          </section>
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link to="/" className="px-8">
              <DollarSign className="mr-2 h-5 w-5" />
              Start Playing
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
