"""Added organization email

Revision ID: 6c453ce8996e
Revises: 2f527c09c13f
Create Date: 2021-11-05 12:53:54.477071

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6c453ce8996e'
down_revision = '2f527c09c13f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('organization', sa.Column('email', sa.String(), nullable=True))
    op.create_unique_constraint(None, 'organization', ['email'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'organization', type_='unique')
    op.drop_column('organization', 'email')
    # ### end Alembic commands ###
