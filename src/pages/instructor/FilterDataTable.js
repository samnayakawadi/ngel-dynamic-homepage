import React from "react";
import styled from "styled-components";
import { Button } from 'react-bootstrap';

const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.small ? 5 : undefined
}))`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color : white;
`;

const FilterDataTable = ({ filterText, onFilter, onClear }) => (
  <>
    <div className="d-flex flex-wrap justify-content-between align-items-center">
      <div className="flex-grow-1 pr-1">
        <Input
          id="search"
          type="text"
          placeholder="Search Table Data..."
          value={filterText}
          onChange={onFilter}
        />
      </div>
      <Button
        onClick={onClear}
        style={{ background: 'green', border: '0px' }}
      >
        <i className="fas fa-times"></i>
      </Button>
    </div>


  </>
);

export default FilterDataTable;
