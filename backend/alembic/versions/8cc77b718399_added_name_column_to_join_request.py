"""Added name column to join_request

Revision ID: 8cc77b718399
Revises: d22bbc824024
Create Date: 2021-11-28 21:56:35.465460

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8cc77b718399'
down_revision = 'd22bbc824024'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('join_request', sa.Column('name', sa.String()))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('join_request', 'name')
    # ### end Alembic commands ###
