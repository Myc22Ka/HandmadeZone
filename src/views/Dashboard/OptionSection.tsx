import DefaultLayout from '@/layouts/DefaultLayout';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';

const sections = [
    { title: 'Zmień hasło', content: null },
    { title: 'Zmień e-mail', content: 'Zaktualizuj swój adres e-mail w tym miejscu.' },
    { title: 'Logo i baner', content: 'Dodaj lub edytuj logo i baner swojego konta.' },
    { title: 'Dane do faktury', content: 'Wprowadź dane potrzebne do generowania faktur.' },
    { title: 'Zarządzanie kontem', content: 'Opcje dotyczące zamykania lub usuwania konta.' },
];

const OptionSection: React.FC = () => {
    return (
        <DefaultLayout>
            <div className={`w-3/4 mx-auto mt-10 p-2 rounded-lg`}>
                {/* Accordion for sections */}
                <Accordion type="single" collapsible>
                    {sections.map(section => (
                        <AccordionItem key={section.title} value={section.title}>
                            <Card className="mb-4">
                                <CardHeader className="p-2">
                                    <AccordionTrigger className="flex justify-between items-center w-full text-lg font-medium text-left">
                                        <CardTitle>{section.title}</CardTitle>
                                    </AccordionTrigger>
                                </CardHeader>
                                <AccordionContent className="p-2">
                                    {section.title === 'Zmień hasło' ? (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" color="blue">
                                                    Otwórz okno zmiany hasła
                                                </Button>
                                            </DialogTrigger>

                                            <DialogContent className="w-[400px]">
                                                <DialogHeader>
                                                    <DialogTitle>Zmień swoje hasło</DialogTitle>
                                                </DialogHeader>
                                                <form>
                                                    <label className="block mb-2">
                                                        Nowe hasło:
                                                        <input
                                                            type="password"
                                                            className="w-full mt-1 p-2 border rounded bg-gray-100 focus:outline-none focus:ring"
                                                        />
                                                    </label>
                                                    <label className="block mb-4">
                                                        Potwierdź hasło:
                                                        <input
                                                            type="password"
                                                            className="w-full mt-1 p-2 border rounded bg-gray-100 focus:outline-none focus:ring"
                                                        />
                                                    </label>
                                                    <DialogFooter>
                                                        <Button variant="outline" color="gray">
                                                            Anuluj
                                                        </Button>
                                                        <Button type="submit" color="blue">
                                                            Zmień hasło
                                                        </Button>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    ) : (
                                        <p>{section.content || 'Brak szczegółowych informacji.'}</p>
                                    )}
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </DefaultLayout>
    );
};

export default OptionSection;
