'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      username: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      account: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.ENUM({
          values: ['SUPERADMIN', 'ADMIN', 'WAITER', 'COOK']
        })
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      account: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        default: 0.00,
        type: Sequelize.DECIMAL
      },
      allergen: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      ingredients: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      alcohol: {
        allowNull: false,
        default: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Tables', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM({
          values: ['READY', 'COOKING', 'ERROR', 'SERVED']
        })
      },
      price: {
        allowNull: false,
        default: 0.00,
        type: Sequelize.DECIMAL
      },
      account: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_paid: {
        allowNull: false,
        default: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      table_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Tables',
          key: 'id'
        }
      },
      price: {
        allowNull: false,
        default: 0.00,
        type: Sequelize.DECIMAL
      },
      is_paid: {
        allowNull: false,
        default: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Suborders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      order_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Orders',
          key: 'id'
        }
      },
      product_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      running_order: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM({
          values: ['READY', 'COOKING', 'ERROR', 'SERVED']
        })
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Menu', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      account: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Sections', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      menu_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Menu',
          key: 'id'
        }
      },
      product_ids: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: true,
        default: 0.00,
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Subsections', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      section_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Sections',
          key: 'id'
        }
      },
      product_ids: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: true,
        default: 0.00,
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Menu');
    await queryInterface.dropTable('Orders');
    await queryInterface.dropTable('Products');
    await queryInterface.dropTable('Sections');
    await queryInterface.dropTable('Suborders');
    await queryInterface.dropTable('Subsections');
    await queryInterface.dropTable('Tables');
  }
};