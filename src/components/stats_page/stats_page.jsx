import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import useStats from "../../utilities/employer/statistique";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement } from 'chart.js';
import TableComponent from "../table/table";
import './stats_page.css';

// Enregistrer les composants de base pour Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement);

const StatsDashboard = () => {
    const { fetchStats } = useStats();
    const [statData, setStatData] = useState(null);

    useEffect(() => {
        const loadStats = async () => {
            const stats = await fetchStats();
            setStatData(stats);
        };

        loadStats();
    }, []);

    if (!statData) {
        return <div>Chargement des statistiques...</div>;
    }

    // Données pour le graphique des plats populaires
    const platData = {
        labels: statData.statisticPlat.map((plat) => plat.nom_plat),
        datasets: [{
            label: 'Nombre de commandes',
            data: statData.statisticPlat.map((plat) => plat.total_commande),
backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    // Données pour le graphique des commandes livrées
    const commandeLivreeCount = statData.commandeLivrer.reduce((total, item) => total + item.total_commandes, 0);
    const commandeNonLivreeCount = 100 - commandeLivreeCount; // Remplacer 100 par le total réel si disponible

    const commandeData = {
        labels: ['Commandes Livrées', 'Commandes Non Livrées'],
        datasets: [{
            label: 'Commandes',
            data: [commandeLivreeCount, commandeNonLivreeCount],
            backgroundColor: ['#4caf50', '#ff5252']
        }]
    };

    // Détails du temps moyen de traitement
    const tempsMoyen = statData.tempMoyen[0]?.temps_moyen_traitement_reclamations || 'Non disponible';

    return (
        <div style={{ backgroundColor: 'black'}}>
            <h2 className="text-center" style={{margin: '0', padding: '50px', fontFamily: 'pacifico', fontSize: '40px'}}>Tableau de bord des Statistiques</h2>

            {/* Graphique des plats populaires */}
            <div className="stats-container">
                <h3>Plats les plus populaires</h3>
                <Bar data={platData} options={{ responsive: true }} />
            </div>

            {/* Graphique des commandes livrées */}
            <div className="stats-container">
                <h3>Commandes Livrées</h3>
                <div className="div-row" style={{maxWidth: '500px'}}>
                    <div className="pie-container" style={{width: '70%'}}>
                        <Pie
                            data={{
                                labels: ['Commandes Livrées', 'Commandes Non Livrées'],
                                datasets: [
                                    {
                                        label: 'Commandes',
                                        data: [statData.commandeLivrer[0]?.total_commandes || 0, 100 - (statData.commandeLivrer[0]?.total_commandes || 0)], // Vérifie que les données existent
                                        backgroundColor: ['#000000', '#cfbd97'], // Noir et #cfbd97
                                        hoverBackgroundColor: ['#333333', '#d8c6a1'], // Couleurs au survol
                                        borderColor: ['#ffffff', '#ffffff'], 
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div className="key"style={{width: '30%'}}>
                        <div className="div-row">
                            <div className="color-1"></div>
                            <p>Commande Livrees</p>
                        </div>
                        <div className="div-row">
                            <div className="color-2"></div>
                            <p>Commades Non-Livrees</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Détails du temps de traitement des réclamations */}
            <div className="stats-container">
                <h3>Détails des temps de traitement des réclamations</h3>
                {/* Définition des en-têtes et des données pour le tableau */}
                <TableComponent
                    headers={['ID Réclamation', 'ID Client', 'Temps de traitement']}
                    data={statData.detailsTemp.map(detail => [
                        detail.id_reclamation,
                        detail.id_client,
                        detail.temps_traitement
                    ])}
                />
                <div className="row">
                    <div className="col">
                        <h6 style={{fontFamily: 'pacifico'}}>Temps moyen de traitement des réclamations</h6>
                    </div>
                    <div className="col">
                        <p>{tempsMoyen}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsDashboard;
