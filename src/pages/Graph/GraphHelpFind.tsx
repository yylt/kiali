import * as React from 'react';
import Draggable from 'react-draggable';
import {
  Button,
  Icon,
  Nav,
  NavItem,
  TabContainer,
  TabContent,
  TabPane,
  Table,
  TablePfProvider
} from 'patternfly-react';
import * as resolve from 'table-resolver';

export interface GraphHelpFindProps {
  onClose: () => void;
  className?: string;
}

export default class GraphHelpFind extends React.Component<GraphHelpFindProps> {
  headerFormat = (label, { column }) => <Table.Heading className={column.property}>{label}</Table.Heading>;
  cellFormat = (value, { column }) => {
    const props = column.cell.props;
    const className = props ? props.align : '';

    return <Table.Cell className={className}>{value}</Table.Cell>;
  };

  constructor(props: GraphHelpFindProps) {
    super(props);
  }

  edgeColumns = () => {
    return {
      columns: [
        {
          property: 'c',
          header: {
            label: 'Expression',
            formatters: [this.headerFormat]
          },
          cell: {
            formatters: [this.cellFormat],
            props: {
              align: 'text-left'
            }
          }
        },
        {
          property: 'n',
          header: {
            label: 'Notes',
            formatters: [this.headerFormat]
          },
          cell: {
            formatters: [this.cellFormat],
            props: {
              align: 'text-left'
            }
          }
        }
      ]
    };
  };

  exampleColumns = () => {
    return {
      columns: [
        {
          property: 'e',
          header: {
            label: 'Expression',
            formatters: [this.headerFormat]
          },
          cell: {
            formatters: [this.cellFormat],
            props: {
              align: 'text-left'
            }
          }
        },
        {
          property: 'd',
          header: {
            label: 'Description',
            formatters: [this.headerFormat]
          },
          cell: {
            formatters: [this.cellFormat],
            props: {
              align: 'text-left'
            }
          }
        }
      ]
    };
  };

  nodeColumns = () => {
    return {
      columns: [
        {
          property: 'c',
          header: {
            label: 'Expression',
            formatters: [this.headerFormat]
          },
          cell: {
            formatters: [this.cellFormat],
            props: {
              align: 'text-left'
            }
          }
        },
        {
          property: 'n',
          header: {
            label: 'Notes',
            formatters: [this.headerFormat]
          },
          cell: {
            formatters: [this.cellFormat],
            props: {
              align: 'text-left'
            }
          }
        }
      ]
    };
  };

  operatorColumns = () => {
    return {
      columns: [
        {
          property: 'o',
          header: {
            label: 'Operator',
            formatters: [this.headerFormat]
          },
          cell: {
            formatters: [this.cellFormat],
            props: {
              align: 'text-center'
            }
          }
        },
        {
          property: 'd',
          header: {
            label: 'Description',
            formatters: [this.headerFormat]
          },
          cell: {
            formatters: [this.cellFormat],
            props: {
              align: 'text-left'
            }
          }
        }
      ]
    };
  };

  tipColumns = () => {
    return {
      columns: [
        {
          property: 't',
          header: {
            label: 'Tip',
            formatters: [this.headerFormat]
          },
          cell: {
            formatters: [this.cellFormat],
            props: {
              align: 'textleft'
            }
          }
        }
      ]
    };
  };

  render() {
    const className = this.props.className ? this.props.className : '';
    return (
      <Draggable handle="#helpheader">
        <div
          className={`modal-content ${className}`}
          style={{
            width: '600px',
            height: 'auto',
            right: '0',
            top: '10px',
            zIndex: 9999,
            position: 'absolute'
          }}
        >
          <div id="helpheader" className="modal-header">
            <Button className="close" bsClass="" onClick={this.props.onClose}>
              <Icon title="Close" type="pf" name="close" />
            </Button>
            <span className="modal-title">Help: Graph Find/Hide</span>
          </div>
          <TabContainer id="basic-tabs" defaultActiveKey="examples">
            <div>
              <Nav bsClass="nav nav-tabs nav-tabs-pf" style={{ paddingLeft: '10px' }}>
                <NavItem eventKey="examples">
                  <div>Examples</div>
                </NavItem>
                <NavItem eventKey="nodes">
                  <div>Nodes</div>
                </NavItem>
                <NavItem eventKey="edges">
                  <div>Edges</div>
                </NavItem>
                <NavItem eventKey="operators">
                  <div>Operators</div>
                </NavItem>
                <NavItem eventKey="tips">
                  <div>Tips</div>
                </NavItem>
              </Nav>
              <TabContent>
                <TabPane eventKey="examples">
                  <TablePfProvider
                    striped={true}
                    bordered={true}
                    hover={true}
                    dataTable={true}
                    columns={this.exampleColumns().columns}
                  >
                    <Table.Header headerRows={resolve.headerRows(this.exampleColumns())} />
                    <Table.Body
                      rowKey="id"
                      rows={[
                        {
                          id: 'e00',
                          e: 'name = reviews',
                          d: `"find by name": find nodes with app label, service name or workload name equal to 'reviews'`
                        },
                        {
                          id: 'e10',
                          e: 'name not contains rev',
                          d: `"find by name": find nodes with app label, service name and workload name not containing 'rev'`
                        },
                        {
                          id: 'e20',
                          e: 'app startswith product',
                          d: `find nodes with app label starting with 'product'`
                        },
                        {
                          id: 'e30',
                          e: 'app != details and version=v1',
                          d: `find nodes with app label not equal to 'details' and with version equal to 'v1'`
                        },
                        { id: 'e40', e: '!sc', d: `find nodes without a sidecar` },
                        { id: 'e50', e: 'httpin > 0.5', d: `find nodes with incoming http rate > 0.5 rps` },
                        { id: 'e60', e: 'tcpout >= 1000', d: `find nodes with outgoing tcp rates >= 1000 bps` },
                        { id: 'e70', e: 'http > 0.5', d: `find edges with http rate > 0.5 rps` },
                        {
                          id: 'e80',
                          e: 'rt > 500',
                          d: `find edges with response time > 500ms. (requires response time edge labels)`
                        },
                        {
                          id: 'e90',
                          e: '%httptraffic >= 50.0',
                          d: `find edges with >= 50% of the outgoing http request traffic of the parent`
                        }
                      ]}
                    />
                  </TablePfProvider>
                </TabPane>
                <TabPane eventKey="nodes" mountOnEnter={true} unmountOnExit={true}>
                  <TablePfProvider
                    striped={true}
                    bordered={true}
                    hover={true}
                    dataTable={true}
                    columns={this.nodeColumns().columns}
                  >
                    <Table.Header headerRows={resolve.headerRows(this.nodeColumns())} />
                    <Table.Body
                      rowKey="id"
                      rows={[
                        { id: 'nc00', c: 'grpcin <op> <number>', n: 'unit: requests per second' },
                        { id: 'nc10', c: 'grpcout <op> <number>', n: 'unit: requests per second' },
                        { id: 'nc12', c: 'httpin <op> <number>', n: 'unit: requests per second' },
                        { id: 'nc13', c: 'httpout <op> <number>', n: 'unit: requests per second' },
                        {
                          id: 'nc15',
                          c: 'name <op> <string>',
                          n: 'tests against app label, service name and workload name'
                        },
                        { id: 'nc20', c: 'namespace <op> <namespaceName>' },
                        { id: 'nc25', c: 'node <op> <nodeType>', n: 'nodeType: app | service | workload | unknown' },
                        { id: 'nc30', c: 'service <op> <serviceName>' },
                        { id: 'nc40', c: 'version <op> <string>' },
                        { id: 'nc50', c: 'tcpin <op> <number>', n: 'unit: bytes per second' },
                        { id: 'nc60', c: 'tcpout <op> <number>', n: 'unit: bytes per second' },
                        { id: 'nc70', c: 'workload <op> <workloadName>' },
                        { id: 'nc90', c: 'circuitbreaker' },
                        { id: 'nc100', c: 'outside', n: 'is outside of requested namespaces' },
                        { id: 'nc110', c: 'sidecar' },
                        { id: 'nc130', c: 'serviceentry' },
                        { id: 'nc135', c: 'trafficsource', n: `has only outgoing edges` },
                        { id: 'nc150', c: 'unused', n: `'Show Unused' option must be enabled` },
                        { id: 'nc160', c: 'virtualservice' }
                      ]}
                    />
                  </TablePfProvider>
                </TabPane>
                <TabPane eventKey="edges" mountOnEnter={true} unmountOnExit={true}>
                  <TablePfProvider
                    striped={true}
                    bordered={true}
                    hover={true}
                    dataTable={true}
                    columns={this.edgeColumns().columns}
                  >
                    <Table.Header headerRows={resolve.headerRows(this.edgeColumns())} />
                    <Table.Body
                      rowKey="id"
                      rows={[
                        { id: 'ec00', c: 'grpc <op> <number>', n: 'unit: requests per second' },
                        { id: 'ec10', c: '%grpcerr <op> <number>', n: 'range: [0..100]' },
                        { id: 'ec20', c: '%grpctraffic <op> <number>', n: 'range: [0..100]' },
                        { id: 'ec23', c: 'http <op> <number>', n: 'unit: requests per second' },
                        { id: 'ec24', c: '%httperr <op> <number>', n: 'range: [0..100]' },
                        { id: 'ec25', c: '%httptraffic <op> <number>', n: 'range: [0..100]' },
                        { id: 'ec30', c: 'protocol <op> <protocol>', n: 'grpc, http, tcp, etc..' },
                        {
                          id: 'ec40',
                          c: 'responsetime <op> <number>',
                          n: `unit: millis, 'Response Time' edge labels required`
                        },
                        { id: 'ec50', c: 'tcp <op> <number>', n: 'unit: requests per second' },
                        { id: 'ec60', c: 'mtls' }
                      ]}
                    />
                  </TablePfProvider>
                </TabPane>
                <TabPane eventKey="operators" mountOnEnter={true} unmountOnExit={true}>
                  <TablePfProvider
                    striped={true}
                    bordered={true}
                    hover={true}
                    dataTable={true}
                    columns={this.operatorColumns().columns}
                  >
                    <Table.Header headerRows={resolve.headerRows(this.operatorColumns())} />
                    <Table.Body
                      rowKey="id"
                      rows={[
                        { id: 'o0', o: '! | not <unary expression>', d: `negation` },
                        { id: 'o1', o: '=', d: `equals` },
                        { id: 'o2', o: '!=', d: `not equals` },
                        { id: 'o3', o: 'endswith | $=', d: `ends with, strings only` },
                        { id: 'o4', o: '!endswith | !$=', d: `not ends with, strings only` },
                        { id: 'o5', o: 'startswith | ^=', d: `starts with, strings only` },
                        { id: 'o6', o: '!startswith | !^=', d: `not starts with, strings only` },
                        { id: 'o7', o: 'contains | *=', d: 'contains, strings only' },
                        { id: 'o8', o: '!contains | !*=', d: 'not contains, strings only' },
                        { id: 'o9', o: '>', d: `greater than` },
                        { id: 'o10', o: '>=', d: `greater than or equals` },
                        { id: 'o11', o: '<', d: `less than` },
                        { id: 'o12', o: '<=', d: `less than or equals` }
                      ]}
                    />
                  </TablePfProvider>
                </TabPane>
                <TabPane eventKey="tips" mountOnEnter={true} unmountOnExit={true}>
                  <TablePfProvider
                    striped={true}
                    bordered={true}
                    hover={true}
                    dataTable={true}
                    columns={this.tipColumns().columns}
                  >
                    <Table.Header headerRows={resolve.headerRows(this.tipColumns())} />
                    <Table.Body
                      rowKey="id"
                      rows={[
                        { id: 't00', t: 'Expressions can not combine "and" with "or".' },
                        { id: 't05', t: 'Parentheses are not supported (or needed).' },
                        { id: 't10', t: 'Find by name expands to an "or" expression internally.' },
                        { id: 't20', t: 'Not Find by name expands to an "and" expression internally.' },
                        { id: 't30', t: 'Expressions can not combine node and edge criteria.' },
                        {
                          id: 't40',
                          t: 'Numeric equality (=,!=) is exact match. Include leading 0 and digits of precision.'
                        },
                        {
                          id: 't45',
                          t:
                            'Use "<operand> = NaN" to test for no activity. Use "!= NaN" for any activity. (e.g. httpout = NaN)'
                        },
                        { id: 't50', t: 'Numerics use "." decimal notation.' },
                        { id: 't60', t: 'Percentages use 1 digit of precision, Rates use 2 digits of precision.' },
                        {
                          id: 't70',
                          t: `Unary operands may optionally be prefixed with " is " or " has ". (i.e. "has mtls")`
                        },
                        {
                          id: 't80',
                          t: 'Abbrevations: namespace|ns, service|svc, workload|wl (e.g. is wlnode)'
                        },
                        {
                          id: 't90',
                          t:
                            'Abbrevations: circuitbreaker|cb, responsetime|rt, serviceentry->se, sidecar|sc, virtualservice|vs'
                        }
                      ]}
                    />
                  </TablePfProvider>
                </TabPane>
              </TabContent>
            </div>
          </TabContainer>
        </div>
      </Draggable>
    );
  }
}
