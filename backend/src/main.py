from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import FastAPI, Depends, Request
from database import get_session, database
from pydantic import BaseModel
from transport.schema import *
from transport.models import *
import uvicorn, asyncpg
from typing import Dict, Any
from random import choice, randint

app = FastAPI(title="Leonid Project")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#-------------------------------Brand------------------------------#
@app.get("/api/get_brand_ts")
async def get_brand_ts() -> list[BrandTSRead]:
    return await database.fetch_all(brand_ts.select())


@app.post("/api/add_brand_ts")
async def add_brand_ts(request: BrandTSCreate):
    # print(request.name)
    query = brand_ts.insert().values(name=request.name)
    return await database.execute(query)


#-------------------------------Model------------------------------#
@app.get("/api/get_model_ts")
async def get_model_ts() -> list[ModelTSRead]:
    return await database.fetch_all(model_ts.select())


@app.post("/api/add_model_ts")
async def add_model_ts(request: ModelTSCreate):
    query = model_ts.insert().values(
        name=request.name,
        brand_id=request.brand_id,
        count_sit_places=request.count_sit_places,
        count_stay_places=request.count_stay_places
    )
    return await database.execute(query)


#-------------------------------TS------------------------------#
@app.get("/api/get_ts")
async def get_ts() -> list[TSRead]:
    return await database.fetch_all(ts.select())


@app.post("/api/add_ts")
async def add_ts(request: TSCreate):
    query = ts.insert().values(
        model_id=request.model_id,
        number_ts=request.number_ts
    )
    return await database.execute(query)


#-------------------------------Route------------------------------#
def get_random_color() -> str:
    return "rgb(" + ", ".join([str(randint(0, 200)) for _ in "..."]) + ")"

@app.get("/api/get_route")
async def get_route():
    data = []
    for i in await database.fetch_all(route.select()):
        elem = dict()
        elem["route"] = i["number"]
        elem["color"] = {"color": get_random_color(), "weight": 5}
        elem["coords"] = []
        for j in i["interval"].split("-"):
            obshee = j.split(";")
            a = obshee[0]
            b = obshee[1]
            c = {"BS": obshee[2]}
            elem["coords"].append([a, b, c])
        data.append(elem)
    return data


@app.post("/api/add_route")
async def add_route(request: Dict[Any, Any]):
    ts_ids = await database.fetch_all(ts.select())
    ts_ids = list(map(lambda x: x["id"], ts_ids))
    routes_number = await database.fetch_all(route.select())
    routes_number = list(map(lambda x: x["number"], routes_number))

    for i in request["data"]:
        if not i['route']: continue
        if i["route"] in routes_number:
            routes_number = list(filter(lambda x: x != i["route"], routes_number))
        routes = []
        for j in i["coords"]:
            e = str(j[0]) + ";" + str(j[1]) + ";" + j[2]["BS"]
            routes.append(e)
        routes = "-".join(routes)
        bs_name = i["coords"][0][2]["BS"]
        bs_id = await database.fetch_one(bs.select().where(bs.c.name == bs_name))
        if await database.fetch_one(route.select().where(route.c.number == i["route"])):
            # await database.execute(route.update().where(route.c.number == i["route"]).values(interval=routes))
            pass
        else:
            await database.execute(route.insert().values(
                bs_id=bs_id["id"],
                number=i["route"],
                interval=routes,
                ts_id=choice(ts_ids)
            ))
    for i in routes_number:
        await database.execute(route.delete().where(route.c.number == i))
    return "database succesfully updated with lines!"


#-------------------------------BS------------------------------#
@app.get("/api/get_bs")
async def get_bs() -> list[BSRead]:
    return await database.fetch_all(bs.select())


@app.post("/api/edit_bs")
async def add_bs(request: Dict[Any, Any]):
    global all_markers
    # query = bs.insert().values(
    #     latitude=request.latitude,
    #     longtitude=request.longtitude,
    #     name=request.name
    # )
    for ind, i in enumerate(request.get("data")):
        res = await database.fetch_one(bs.select().where(bs.c.name == i['desc']))
        if res is None and i["status"] == "new":
            try:
                await database.execute(bs.insert().values(
                    latitude=str(i["lat"]),
                    longitude=str(i["lng"]),
                    name=i['desc']
                ))
            except asyncpg.exceptions.UniqueViolationError:
                pass
        elif i["status"] == "del":
            for j in await database.fetch_all(route.select()):
                if i["desc"] in j["interval"]:
                    all_bs = j["interval"].split("-")
                    if len(all_bs) == 1: await database.execute(route.delete().where(route.c.id == j["id"]))
                    bs_one = await database.fetch_one(bs.select().where(bs.c.name == i["desc"]))
                    if bs_one["id"] == j["bs_id"]:
                        await database.execute(route.delete().where(route.c.id == j["id"]))
                    all_bs = list(filter(lambda x: i["desc"] not in x, all_bs))
                    all_bs = "-".join(all_bs)
                    await database.execute(route.update().where(route.c.id == j["id"]).values(interval=all_bs))
            await database.execute(bs.delete().where(bs.c.name == i["desc"]))

    return await database.fetch_all(bs.select()) # database.execute(query)

#-------------------------------Plan Time------------------------------#
@app.get("/api/get_plan_time")
async def get_plan_time() -> list[PlanTimeRead]:
    return await database.fetch_all(plan_time.select())


@app.post("/api/add_plan_time")
async def add_plan_time(request: PlanTimeCreate):
    query = bs.insert().values(
        bs_id=request.bs_id,
        route_id=request.route_id,
        time=request.time
    )
    return await database.execute(query)


#-------------------------------Real Time------------------------------#
@app.get("/api/get_real_time")
async def get_real_time() -> list[RealTimeRead]:
    return await database.fetch_all(real_time.select())


@app.post("/api/add_real_time")
async def add_real_time(request: RealTimeCreate):
    query = bs.insert().values(
        bs_id=request.bs_id,
        route_id=request.route_id,
        time=request.time
    )
    return await database.execute(query)



@app.on_event("startup")
async def startup() -> None:
    database_ = database
    if not database_.is_connected:
        await database_.connect()


@app.on_event("shutdown")
async def shutdown() -> None:
    database_ = database
    if database_.is_connected:
        await database_.disconnect()

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)