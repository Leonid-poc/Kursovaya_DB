"""first create

Revision ID: ea00ebecf5f1
Revises: 
Create Date: 2024-05-06 18:23:39.419150

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ea00ebecf5f1'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('brand_ts',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bs',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(length=255), nullable=False),
    sa.Column('latitude', sa.VARCHAR(length=100), nullable=False),
    sa.Column('longitude', sa.VARCHAR(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('model_ts',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('brand_id', sa.Integer(), nullable=True),
    sa.Column('count_sit_places', sa.Integer(), nullable=False),
    sa.Column('count_stay_places', sa.Integer(), nullable=False),
    sa.Column('name', sa.VARCHAR(length=255), nullable=False),
    sa.ForeignKeyConstraint(['brand_id'], ['brand_ts.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('route',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('bs_id', sa.Integer(), nullable=True),
    sa.Column('number', sa.Integer(), nullable=False),
    sa.Column('interval', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['bs_id'], ['bs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('planTime',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('route_id', sa.Integer(), nullable=True),
    sa.Column('bs_id', sa.Integer(), nullable=True),
    sa.Column('time', sa.TIMESTAMP(), nullable=True),
    sa.ForeignKeyConstraint(['bs_id'], ['bs.id'], ),
    sa.ForeignKeyConstraint(['route_id'], ['route.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('real_time',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('route_id', sa.Integer(), nullable=True),
    sa.Column('bs_id', sa.Integer(), nullable=True),
    sa.Column('time', sa.TIMESTAMP(), nullable=True),
    sa.ForeignKeyConstraint(['bs_id'], ['bs.id'], ),
    sa.ForeignKeyConstraint(['route_id'], ['route.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ts',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('model_id', sa.Integer(), nullable=True),
    sa.Column('number_ts', sa.VARCHAR(length=255), nullable=False),
    sa.ForeignKeyConstraint(['model_id'], ['model_ts.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('users')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('name', sa.TEXT(), autoincrement=False, nullable=False),
    sa.Column('login', sa.TEXT(), autoincrement=False, nullable=False),
    sa.Column('password', sa.TEXT(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='users_pkey')
    )
    op.drop_table('ts')
    op.drop_table('real_time')
    op.drop_table('planTime')
    op.drop_table('route')
    op.drop_table('model_ts')
    op.drop_table('bs')
    op.drop_table('brand_ts')
    # ### end Alembic commands ###
