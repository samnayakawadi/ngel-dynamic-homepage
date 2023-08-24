import styled from "styled-components";

export const Styles = styled.div`
    .gallery-area {
        .gallery-box {
            overflow: hidden;
            position: relative;
            img {
                transition : all 0.3s ease;
                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }
`;