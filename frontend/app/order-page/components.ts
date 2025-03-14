import styled from "styled-components/native";
import { Palette } from "../../assets/Palette";

export const Title = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 16px;
`

export const PriceDetails = styled.View`
  padding: 8px 0px;
  border-top-width: 1px;
  border-color: ${Palette.light_gray};
`;

export const PriceCell = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PriceLabel = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 16px;
  color: ${Palette.dark_gray};
`;

export const PriceValue = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 16px;
  color: ${Palette.dark_gray};
`;

export const SectionHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TotalCell = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 16px;
`;

export const Total = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 18px;
  color: ${Palette.dark_gray};
`

