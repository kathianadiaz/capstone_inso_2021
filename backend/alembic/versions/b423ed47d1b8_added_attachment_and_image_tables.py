"""Added attachment and image tables

Revision ID: b423ed47d1b8
Revises: 6c453ce8996e
Create Date: 2021-11-12 16:55:52.896789

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'b423ed47d1b8'
down_revision = '6c453ce8996e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('attachment',
    sa.Column('a_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('data', postgresql.BYTEA(), nullable=True),
    sa.Column('filename', sa.String(), nullable=True),
    sa.Column('content_type', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('a_id')
    )
    op.create_table('image',
    sa.Column('i_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('data', postgresql.BYTEA(), nullable=True),
    sa.Column('filename', sa.String(), nullable=True),
    sa.Column('content_type', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('i_id')
    )
    op.create_table('join_request',
    sa.Column('r_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('o_id', postgresql.UUID(as_uuid=True), nullable=True),
    sa.Column('u_id', postgresql.UUID(as_uuid=True), nullable=True),
    sa.Column('m_id', postgresql.UUID(as_uuid=True), nullable=True),
    sa.Column('date', sa.Date(), nullable=True),
    sa.Column('message', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['m_id'], ['member_information.m_id'], ),
    sa.ForeignKeyConstraint(['o_id'], ['organization.o_id'], ),
    sa.ForeignKeyConstraint(['u_id'], ['user.u_id'], ),
    sa.PrimaryKeyConstraint('r_id')
    )
    op.add_column('member_information', sa.Column('a_id', postgresql.UUID(as_uuid=True), nullable=True))
    op.add_column('member_information', sa.Column('i_id', postgresql.UUID(as_uuid=True), nullable=True))
    op.create_foreign_key(None, 'member_information', 'attachment', ['a_id'], ['a_id'])
    op.create_foreign_key(None, 'member_information', 'image', ['i_id'], ['i_id'])
    op.drop_column('member_information', 'picture')
    op.drop_column('member_information', 'resume')
    op.add_column('organization_highlight', sa.Column('a_id', postgresql.UUID(as_uuid=True), nullable=True))
    op.create_foreign_key(None, 'organization_highlight', 'attachment', ['a_id'], ['a_id'])
    op.drop_column('organization_highlight', 'attachment')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('organization_highlight', sa.Column('attachment', postgresql.BYTEA(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'organization_highlight', type_='foreignkey')
    op.drop_column('organization_highlight', 'a_id')
    op.add_column('member_information', sa.Column('resume', postgresql.BYTEA(), autoincrement=False, nullable=True))
    op.add_column('member_information', sa.Column('picture', postgresql.BYTEA(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'member_information', type_='foreignkey')
    op.drop_constraint(None, 'member_information', type_='foreignkey')
    op.drop_column('member_information', 'i_id')
    op.drop_column('member_information', 'a_id')
    op.drop_table('join_request')
    op.drop_table('image')
    op.drop_table('attachment')
    # ### end Alembic commands ###
