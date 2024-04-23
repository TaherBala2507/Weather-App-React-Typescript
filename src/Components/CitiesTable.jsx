import axios from 'axios'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'

const CitiesTable = () => {

    const [cities, setCities] = useState([])
    const [searchCity, setSearchCity] = useState("")
    const [filterCities, setFilterCities] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    useEffect(() => {

        getCitiesData();
    }, [])
    const getCitiesData = async () => {
        try {
            const res = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=10&offset=${(currentPage - 1) * 10}`)
            const newCities = res.data.results
            setCities(prevCities => [...prevCities, ...newCities])
            setCurrentPage(prevPage => prevPage + 1)
            if (cities.length == 0) {
                sethasMore(false)
            }

        }
        catch (err) {
            console.log("Error Round", err);
        }
    }
    const handleSearchCity = (e) => {
        setSearchCity(e.target.value)
    }

    useEffect(() => {
        const fiterCity = cities.filter((city) => (
            city.name.toLowerCase().includes(searchCity.toLowerCase())
        ))
        setFilterCities(fiterCity);

    }, [cities, searchCity])

    const handlRightClick = (e,cityName) => {
        if(e.button ==2 ){
        window.open(`/weather/${cityName}`, "_blank")
        }
    }
    //console.log(cities);
    return (
        <div>
            <div className="flex flex-col">
                <h2 class="text-center text-4xl font-bold mb-4">Cities Table</h2>
                <input class='border-2 border-black px-2 py-2 rounded-lg w-[50]' type="text" placeholder='search...' onChange={handleSearchCity} value={searchCity} />
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <InfiniteScroll
                                dataLength={cities.length} //This is important field to render the next data
                                next={getCitiesData}
                                hasMore={hasMore}
                                loader={<h4>Loading...</h4>}
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }>

                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-start text-lg font-medium text-gray-500 uppercase"
                                            >
                                                City
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-start text-lg font-medium text-gray-500 uppercase"
                                            >
                                                Country
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-start text-lg font-medium text-gray-500 uppercase"
                                            >
                                                Timezone
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {
                                            filterCities.map((city, i) => (
                                                <tr className="hover:bg-gray-100" key={i}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 cursor-pointer"onContextMenu={(e) => handlRightClick(e,city.name)}>
                                                        <Link to={`/weather/${city.name}`}>
                                                            {city.name}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                        {city.cou_name_en}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                        {city.timezone}
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CitiesTable