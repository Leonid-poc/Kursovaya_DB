from sqlalchemy import (
    Table, Column, Integer, ForeignKey, MetaData, VARCHAR, TIMESTAMP
)

"""
ts - Транспортное средство
bs - Остановочный пункт
"""

ts_meta = MetaData()

brand_ts = Table(
    "brand_ts",
    ts_meta,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("name", VARCHAR(255), nullable=False)
)

model_ts = Table(
    "model_ts",
    ts_meta,
    Column("id", Integer, autoincrement=True, primary_key=True),
    Column("brand_id", Integer, ForeignKey(brand_ts.c.id)),
    Column("count_sit_places", Integer, nullable=False),
    Column("count_stay_places", Integer, nullable=False),
    Column("name", VARCHAR(255), nullable=False)
)

ts = Table(
    "ts",
    ts_meta,
    Column("id", Integer, autoincrement=True, primary_key=True),
    Column("model_id", Integer, ForeignKey(model_ts.c.id)),
    Column("number_ts", VARCHAR(255), nullable=False)
)

bs = Table(
    "bs",
    ts_meta,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("name", VARCHAR(255), nullable=False),
    Column("latitude", VARCHAR(100), nullable=False), # широта
    Column("longitude", VARCHAR(100), nullable=False) # долгота
)

route = Table(
    "route",
    ts_meta,
    Column("id", Integer, autoincrement=True, primary_key=True),
    Column("bs_id", Integer, ForeignKey(bs.c.id)),
    Column("ts_id", Integer, ForeignKey(ts.c.id)),
    Column("number", Integer, nullable=False),
    Column("interval", Integer, nullable=False)
)

plan_time = Table(
    "plan_time",
    ts_meta,
    Column("id", Integer, autoincrement=True, primary_key=True),
    Column("route_id", Integer, ForeignKey(route.c.id)),
    Column("bs_id", Integer, ForeignKey(bs.c.id)),
    Column("time", TIMESTAMP)
)

real_time = Table(
    "real_time",
    ts_meta,
    Column("id", Integer, autoincrement=True, primary_key=True),
    Column("route_id", Integer, ForeignKey(route.c.id)),
    Column("bs_id", Integer, ForeignKey(bs.c.id)),
    Column("time", TIMESTAMP)
)