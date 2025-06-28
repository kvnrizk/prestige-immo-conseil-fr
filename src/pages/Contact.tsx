
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    typeProjet: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.email || !formData.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    console.log('Données du formulaire:', formData);
    
    toast({
      title: "Message envoyé !",
      description: "Merci pour votre message. Je vous répondrai dans les plus brefs délais.",
    });

    setFormData({
      nom: '',
      email: '',
      telephone: '',
      typeProjet: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Contactez-moi
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discutons de votre projet immobilier. Je suis là pour vous accompagner 
            à chaque étape de votre parcours.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <Card className="shadow-2xl border-0 bg-card">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    Parlez-moi de votre projet
                  </h2>
                  <p className="text-muted-foreground">
                    Remplissez ce formulaire et je vous recontacterai rapidement pour discuter de vos besoins.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nom" className="block text-sm font-medium text-foreground mb-2">
                        Nom complet *
                      </label>
                      <Input
                        id="nom"
                        name="nom"
                        type="text"
                        value={formData.nom}
                        onChange={handleInputChange}
                        placeholder="Votre nom et prénom"
                        className="h-12"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="telephone" className="block text-sm font-medium text-foreground mb-2">
                        Téléphone
                      </label>
                      <Input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        placeholder="+33 6 12 34 56 78"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre.email@exemple.com"
                      className="h-12"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="typeProjet" className="block text-sm font-medium text-foreground mb-2">
                      Type de projet
                    </label>
                    <select
                      id="typeProjet"
                      name="typeProjet"
                      value={formData.typeProjet}
                      onChange={handleInputChange}
                      className="w-full h-12 px-3 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Sélectionnez votre projet</option>
                      <option value="achat">Achat immobilier</option>
                      <option value="vente">Vente immobilière</option>
                      <option value="location">Location longue durée</option>
                      <option value="saisonniere">Location saisonnière</option>
                      <option value="investissement">Investissement locatif</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Votre message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Décrivez votre projet, vos besoins, vos questions..."
                      rows={6}
                      className="resize-none"
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-medium flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Restons en contact
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-6 bg-muted rounded-xl">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Téléphone</h3>
                      <p className="text-lg text-foreground font-medium">+33 6 12 34 56 78</p>
                      <p className="text-sm text-muted-foreground">Disponible 7j/7 de 8h à 20h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-6 bg-muted rounded-xl">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <p className="text-lg text-foreground font-medium">contact@charbelsagency.fr</p>
                      <p className="text-sm text-muted-foreground">Réponse garantie sous 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-6 bg-muted rounded-xl">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Zone d'intervention</h3>
                      <p className="text-lg text-foreground font-medium">Paris et Île-de-France</p>
                      <p className="text-sm text-muted-foreground">Déplacements possibles en région</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-6 bg-muted rounded-xl">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Horaires</h3>
                      <p className="text-lg text-foreground font-medium">Lun - Dim : 8h - 20h</p>
                      <p className="text-sm text-muted-foreground">Urgences 24h/24</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <MessageCircle className="w-8 h-8" />
                    <h3 className="text-xl font-bold">Consultation gratuite</h3>
                  </div>
                  <p className="text-primary-foreground/90 leading-relaxed">
                    Je vous offre un premier échange gratuit de 30 minutes pour analyser 
                    votre projet et vous présenter mes services. Rencontrons-nous !
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
