import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
const AboutSection = () => {
  const values = [{
    title: "Intégrité",
    description: "Transparence totale et honnêteté dans chaque transaction"
  }, {
    title: "Expertise",
    description: "Connaissance approfondie du marché immobilier français"
  }, {
    title: "Orientation client",
    description: "Vos objectifs et votre satisfaction sont ma priorité absolue"
  }];
  return <section id="a-propos" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Votre partenaire immobilier de confiance
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fort de plusieurs années d'expérience dans l'immobilier, j'ai développé 
                  une expertise complète du marché français. En tant qu'agent indépendant, 
                  je travaille en étroite collaboration avec une agence immobilière reconnue 
                  tout en développant mon propre réseau de clients.
                </p>
                <p>
                  Ma mission est simple : vous accompagner avec professionnalisme et 
                  bienveillance dans la concrétisation de vos projets immobiliers. 
                  Que vous souhaitiez acheter, vendre ou investir, je mets mon expertise 
                  et mon réseau à votre service.
                </p>
                <p>
                  Chaque client est unique, c'est pourquoi j'adapte mon approche à vos 
                  besoins spécifiques et vous accompagne personnellement à chaque étape 
                  de votre projet.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {values.map((value, index) => <div key={index} className="text-center">
                  <h3 className="font-semibold text-primary mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>)}
            </div>
          </div>

          <div className="relative">
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" alt="Professionnel de l'immobilier" className="w-full h-96 object-cover" />
              </CardContent>
            </Card>
            
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;