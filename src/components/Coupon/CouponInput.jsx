import { ArrayInput, NumberInput, SelectInput, SimpleFormIterator, TextInput, required } from "react-admin";

const CouponInput = () => {

  const conditionsType = [
    {
      key: "max_amount",
      title: "Max amount",
    },
    {
      key: "min_amount",
      title: "Min amount",
    },
    {
      key: "max_discount",
      title: "Max discount",
    }
  ];

  const conditionsOperator = [
    {
      operator: "<=",
      display: "≤"
    },
    {
      operator: ">=",
      display: "≥"
    },
    {
      operator: "==",
      display: "="
    },
    {
      operator: ">",
      display: ">"
    },
    {
      operator: "<",
      display: "<"
    }
  ];

  return (
    <ArrayInput
      source="otherConditions"
      label="Conditions"
    >
      <SimpleFormIterator
        inline
      >
        <SelectInput
          choices={conditionsType}
          validate={required()}
          optionText="title"
          optionValue="key"
          source="otherAttribute"
          label="Type"
          helperText={false}
          resettable
        />
        <SelectInput
          choices={conditionsOperator}
          validate={required()}
          optionText="display"
          optionValue="operator"
          source="otherOperator"
          label="Operator"
          helperText={false}
          resettable
        />
        <NumberInput
          min={1}
          source="otherValue"
          helperText={false}
          label="Value"
          validate={required()}
        />
      </SimpleFormIterator>
    </ArrayInput>
  )
};

export default CouponInput;
