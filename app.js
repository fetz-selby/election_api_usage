const io = require("socket.io-client");
const feathers = require("@feathersjs/client");

// Set the year and region id, region id 1 is Ashanti Region
const [year, regionId, constituencyId, candidateType] = ['2016', '1', '2585', 'M'];

// Host address
const host = 'http://127.0.0.1:5002';

// Socket and channel setup
const socket = io(host);
const service = feathers();

// Request functions :)

getConstituencies = async() => 
    await service.service("constituencies").find({ query: { year, regionId } });

getParties = async() => 
    await service.service("parties").find();

getCandidates = async() =>
    await service.service("candidates_ui").find({ query: { year, constituencyId, candidateType } });

getRegions = async() =>
    await service.service("regions").find();

getNationalAnalysis = async() =>
    await service.service("national_analysis").find({ query: { year } });

getRegionalAnalysis = async() =>
    await servic.service("regional_analysis_ui").find({ query: { year, regionId , candidateType} });

getSeat = async() =>
    await service.service("constituency_seats").find({ query: { year, regionId } });


async function create() {
    
    service.configure(feathers.socketio(socket));
    service.configure(feathers.authentication());

    // Get all constituencies for 2016 in a region
    const constituencies = await getConstituencies();

    // Get all parties
    const parties = await getParties();

    // Get all candidates of 2016 in a region
    const candidates = await getCandidates();

    // Get all regions
    const regions = await getRegions();

    // Get regional analysis of a year
    const regionalAnalysis = await getRegionalAnalysis();

    // Get national analysis of a year
    const nationalAnalysis = await getNationalAnalysis();

    // Get get seats won
    const seatsWon = await getSeat();

    // console.log('constituencies, ', constituencies);
    // console.log('parties, ', parties);
    // console.log('candidates, ', candidates);
    // console.log('regions, ', regions);
    // console.log('regionalAnalysis, ', regionalAnalysis);
    // console.log('nationalAnalysis, ', nationalAnalysis);
    // console.log('seats, ', seatsWon);
}

create();