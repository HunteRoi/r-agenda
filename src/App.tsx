import { Container, Table } from 'react-bootstrap';

import { Config } from './types/Config';
import { WeekData } from './types/WeekData';
import db from './database.json';
import React, { Fragment } from 'react';
import Rainbow from 'rainbowvis.js';

const App: React.FC = () => {
    const config: Config = db.config;
    const data: WeekData = db.data;
    const rainbow = new Rainbow();
    rainbow.setNumberRange(config.dayPeriod.start, config.dayPeriod.end);
    rainbow.setSpectrum('green', 'gold', 'brown', 'blue');

    return (<Container fluid>
        <Table responsive variant='dark' style={{ textAlign: 'center' }}>
            <thead>
                <tr>
                    <th></th>
                    {config.daysLabels.map((label, dayNumber) => (<th key={dayNumber}>{label}</th>))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>
                        <p>Activities ⌚</p>
                        {Array.from({ length: config.dayPeriod.end - config.dayPeriod.start }).map((_, index) => {
                            const lineNumber = index + config.dayPeriod.start;
                            return (<p key={lineNumber} style={{ backgroundColor: '#'+rainbow.colorAt(lineNumber) }}>
                                <span className='text-white' key={lineNumber}>{lineNumber}h</span>
                            </p>);
                        })}
                    </th>
                    {data.map((dayData, dayNumber) => {
                        return (<td key={dayNumber}>
                            <p>&#8203;</p>
                            {Array.from({ length: config.dayPeriod.end - config.dayPeriod.start }).map((_, index) => {
                                const lineNumber = index + config.dayPeriod.start;
                                return (<Fragment key={index}>
                                    <p style={{ backgroundColor: '#'+rainbow.colorAt(lineNumber) }} key={lineNumber + dayNumber}>
                                        <span>{dayData.activities[lineNumber]}&#8203;</span>
                                    </p>
                                </Fragment>);
                            })}
                        </td>);
                    })}
                </tr>
                <tr>
                    <th>Tasks 📝</th>
                    {data.map((dayData, dayNumber) => {
                        return (<td key={dayNumber}>{dayData.tasks.join(', ')}</td>);
                    })}
                </tr>
                <tr>
                    <th>Meals 🍽️</th>
                    {data.map((dayData, dayNumber) => {
                        return (<td key={dayNumber}>{dayData.meal}</td>);
                    })}
                </tr>
            </tbody>
        </Table>

        <br />

        <div>

        </div>
    </Container>);
};

export default App;
