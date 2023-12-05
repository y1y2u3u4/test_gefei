import fetch from 'node-fetch';
module.exports = async (req, res) => {
    const { name, suffix } = req.query;
    try {
        const response = await fetch(`https://whois.freeaiapi.xyz/?name=${name}&suffix=${suffix}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
