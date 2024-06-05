from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import FastAPI, Depends, Request
from database import get_session, database
from pydantic import BaseModel
from transport.schema import *
from transport.models import *
import uvicorn, asyncpg
from typing import Dict, Any

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
@app.get("/api/get_route")
async def get_route() -> list[RouteRead]:
    return await database.fetch_all(route.select())


@app.post("/api/add_route")
async def add_route(request: RouteCreate):
    query = brand_ts.insert().values(
        bs_id=request.bs_id,
        number=request.number,
        interval=request.interval
    )
    return await database.execute(query)


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