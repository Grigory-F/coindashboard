import { AssetsModel } from "../models/AssetsModel"


export const getListAssets = (
    response: Array<AssetsModel>
) => {
    return response.map((item: AssetsModel) => {
        return new AssetsModel({
            /** уникальный идентификатор актива */
            id: item.id,
            /** Ранг идет в порядке возрастания - это число напрямую связано с рыночной капитализацией, тогда как самая высокая рыночная капитализация получает ранг 1. */
            rank: item.rank,
            /** наиболее распространенный символ, используемый для идентификации этого актива на бирже */
            symbol: item.symbol,
            /** собственное имя для актива */
            name: item.symbol,
            /** общее количество выпущенных активов */
            supply: item.supply,
            /** предложение x цена */
            maxSupply: item.maxSupply,
            /** объем в долларах США за 24 часа	объем торгов, выраженный в долларах США за последние 24 часа */
            marketCapUsd: item.marketCapUsd,
            /** цена в долларах США	Цена, взвешенная по объему, на основе рыночных данных в режиме реального времени, переведенная в доллары США */
            volumeUsd24Hr: item.volumeUsd24Hr,
            /** 	Цена, взвешенная по объему, на основе рыночных данных в режиме реального времени, переведенная в доллары США */
            priceUsd: item.priceUsd,
            /** направление и значение изменения за последние 24 часа */
            changePercent24Hr: item.changePercent24Hr,
            /** 	Средневзвешенная по объему цена за последние 24 часа */
            vwap24Hr: item.vwap24Hr
        })
    })
}